# HP-Trivia

The idea for a simple to use trivia generator came from a desire to have a fun way to test knowledge of the Harry Potter series. The question pool will come from the books, movies, and Pottermore, however, each question will be tagged with the source so they can easily be filtered.

This app is a work in progress. Currently it supports the ability for registered users to login and add questions to the database. Registration is closed at this time, but might be open soon to more participants.

## Contributing

Once you have pulled the latest changes, you can start contributing to this project. Start by installing the dependencies and running the development server:

```bash
nvm use 

npm install 

npm run dev
```

## Roadmap

- [ ] Add all initial questions to the database
- [x] Create grid to display question topics (and question lists in backend portal)
- [x] Connect endpoints for questions (Random, Hardest, Least Viewed, Topical, etc)
- [x] Style question/answer format with parchment paper background
- [ ] Create question groups for different categories/tags
- [ ] Create "Endless Mode" with High Score Tracker (Number of questions correct in a row)
