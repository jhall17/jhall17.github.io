extern crate console_error_panic_hook;

use chrono::{DateTime, TimeZone, Utc, FixedOffset};
use log::{info, Level};
use plotters::prelude::*;
use plotters_canvas::CanvasBackend;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, panic};
use wasm_bindgen::prelude::*;

pub type DrawResult<T> = Result<T, Box<dyn std::error::Error>>;

#[derive(Serialize, Deserialize, Debug)]
struct LineData {
    x: Vec<i32>,
    lines: HashMap<String, Vec<i32>>,
}

#[derive(Serialize, Deserialize, Debug)]
struct BenchmarkLineData {
    x: Vec<String>,
    lines: HashMap<String, Vec<String>>,
}

#[wasm_bindgen]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

#[wasm_bindgen]
pub struct Chart {
    convert: Box<dyn Fn((i32, i32)) -> Option<(f64, f64)>>,
}

#[wasm_bindgen]
impl Chart {
    pub fn init() -> Result<(), JsValue> {
        panic::set_hook(Box::new(console_error_panic_hook::hook));
        Ok(())
    }

    pub fn line2(canvas_id: &str, data_json: JsValue) -> Result<Chart, JsValue> {
        let map_coord = draw_line2(canvas_id, data_json).map_err(|err| err.to_string())?;
        Ok(Chart {
            convert: Box::new(move |coord| map_coord(coord).map(|(x, y)| (x.into(), y.into()))),
        })
    }

    pub fn benchmarkLine(canvas_id: &str, data_json: JsValue) -> Result<Chart, JsValue> {
        let map_coord = draw_benchmark_line(canvas_id, data_json).map_err(|err| err.to_string())?;
        Ok(Chart {
            convert: Box::new(move |coord| map_coord(coord).map(|(x, y)| (1.0, y.into()))),
        })
    }

    pub fn coord(&self, x: i32, y: i32) -> Option<Point> {
        (self.convert)((x, y)).map(|(x, y)| Point { x, y })
    }
}

fn draw_benchmark_line(
    canvas_id: &str,
    data_json: JsValue,
) -> DrawResult<impl Fn((i32, i32)) -> Option<(DateTime<FixedOffset>, f64)>> {
    console_log::init_with_level(Level::Info).unwrap();

    let data: BenchmarkLineData = serde_wasm_bindgen::from_value(data_json)?;
    let start_date = DateTime::parse_from_rfc3339(&data.x[0])?;
    let end_date = DateTime::parse_from_rfc3339(&data.x[data.x.len() - 1])?;

    let backend = CanvasBackend::new(canvas_id).expect("cannot find canvas");
    let root = backend.into_drawing_area();

    root.fill(&WHITE)?;

    let mut chart = ChartBuilder::on(&root)
        .margin(20u32)
        .x_label_area_size(30u32)
        .y_label_area_size(30u32)
        .build_cartesian_2d(start_date..end_date, 0.0..35.0)?;

    chart.configure_mesh().x_labels(10).y_labels(6).draw()?;

    data.lines.iter().for_each(|(name, line)| {
        chart
            .draw_series(LineSeries::new(
                line.iter().enumerate().map(|(i, y)| {
                    (
                        DateTime::parse_from_rfc3339(&data.x[i]).unwrap(),
                        y.parse::<f64>().unwrap(),
                    )
                }),
                &BLUE,
            ))
            .unwrap()
            .label(name)
            .legend(move |(x, y)| PathElement::new(vec![(x, y), (x + 20, y)], &BLUE));
    });

    root.present()?;
    Ok(chart.into_coord_trans())
}

fn draw_line2(
    canvas_id: &str,
    data_json: JsValue,
) -> DrawResult<impl Fn((i32, i32)) -> Option<(i32, i32)>> {
    console_log::init_with_level(Level::Info).unwrap();

    let data: LineData = serde_wasm_bindgen::from_value(data_json)?;

    let backend = CanvasBackend::new(canvas_id).expect("cannot find canvas");
    let root = backend.into_drawing_area();

    root.fill(&WHITE)?;

    let mut chart = ChartBuilder::on(&root)
        .margin(20u32)
        .x_label_area_size(30u32)
        .y_label_area_size(30u32)
        .build_cartesian_2d(0..50, 0..150)?;

    chart.configure_mesh().x_labels(5).y_labels(15).draw()?;

    data.lines.iter().for_each(|(name, line)| {
        chart
            .draw_series(LineSeries::new(
                line.iter().enumerate().map(|(i, y)| (i as i32, *y)),
                &BLUE,
            ))
            .unwrap()
            .label(name)
            .legend(move |(x, y)| PathElement::new(vec![(x, y), (x + 20, y)], &BLUE));
    });

    root.present()?;
    Ok(chart.into_coord_trans())
}
