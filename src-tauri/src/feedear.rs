use std::path::PathBuf;

use serde::{Deserialize, Serialize};

use crate::helper::read_file;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Parent {
    id: String,
    title: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Feed {
    id: String,
    title: Option<String>,
    parent: Option<Parent>,
    content: String,
    tags: Option<Vec<String>>,
    created_at: String,
    updated_at: Option<String>,
}

#[allow(unused_variables)]
#[derive(Debug)]
pub struct Feedear {
    feeds: Vec<Feed>,
}

impl Feedear {
    pub fn new(raw_feeds: &str) -> Self {
        Self {
            feeds: serde_json::from_str(raw_feeds).unwrap(),
        }
    }

    pub fn filter_feed(&self, parent_id: &str) -> String {
        let mut feeds = self.feeds.clone();
        feeds.retain(|feed| {
            if &feed.id == &parent_id {
                true
            } else {
                if let Some(parent) = &feed.parent {
                    if &parent.id == &parent_id {
                        true
                    } else {
                        false
                    }
                } else {
                    false
                }
            }
        });
        let contents = serde_json::to_string_pretty(&feeds).unwrap();
        contents
    }

    pub fn filter_topic(&self) -> String {
        let mut feeds = self.feeds.clone();
        feeds.retain(|feed| feed.parent.is_none() && feed.title.is_some());
        let contents = serde_json::to_string_pretty(&feeds).unwrap();
        contents
    }

    pub fn create_json(&self, path: &str) {
        let contents = self.feed_merger(&path);
        let file_path = PathBuf::from(&path);

        std::fs::write(&file_path, serde_json::to_string_pretty(&contents).unwrap())
            .expect("Couldn't create the file");
    }

    fn feed_merger(&self, path: &str) -> Vec<Feed> {
        let file_path = PathBuf::from(&path);

        let mut feeds_inputted = self.parent_assigner();
        let contents = match read_file(&file_path) {
            Ok(raw_feeds_file) => {
                let feeds_from_file: Vec<Feed> = serde_json::from_str(&raw_feeds_file).unwrap();
                feeds_inputted.extend(feeds_from_file);
                feeds_inputted
            }
            Err(_) => feeds_inputted,
        };

        contents
    }

    fn parent_assigner(&self) -> Vec<Feed> {
        let mut formatted_feeds: Vec<Feed> = Vec::new();
        let parent = Parent {
            id: self.feeds[0].id.clone(),
            title: self.feeds[0]
                .title
                .clone()
                .unwrap_or(self.feeds[0].content.clone().to_string()), // Note: if no title, use substring from content
        };

        for (index, feed) in self.feeds.iter().enumerate() {
            match &self.feeds.len() {
                0 => panic!("No data"),
                1 => formatted_feeds = self.feeds.clone(),
                _ => {
                    if index == 0 {
                        formatted_feeds.push(feed.clone())
                    } else {
                        formatted_feeds.push(Feed {
                            parent: Some(parent.clone()),
                            ..feed.clone()
                        });
                    }
                }
            }
        }
        formatted_feeds
    }
}
