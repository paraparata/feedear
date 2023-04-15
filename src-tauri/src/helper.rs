use std::{
    fs::File,
    io::{BufReader, Read},
    path::PathBuf,
};

pub fn read_file(path: &PathBuf) -> std::io::Result<String> {
    let file = File::open(&path)?;
    let mut buf_reader = BufReader::new(file);
    let mut contents = String::new();

    buf_reader.read_to_string(&mut contents)?;
    Ok(contents)
}
