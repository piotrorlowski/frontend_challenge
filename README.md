# Installation

## Docker

FYI: I would not expose SECRET_KEY in real environment.

1. `git clone git@github.com:piotrorlowski/frontend_challenge.git && cd frontend_challenge && touch .env`.
2.  in `.env` put:

        SECRET_KEY='5_-tpc3t&v@s)m4ly&1$lmff2wn5xcvwdr-xe+gxw88xn^3qn4'
        ALLOWED_HOSTS=localhost
        AUTH_PASSWORD_VALIDATORS=''
        CORS_ORIGIN_WHITELIST=http://localhost:3000

3. Inside `frontend_challenge/` run `docker-compose up`.
4. Go to `http://localhost:3000/`.

## Venv

1. If there would be some problems with docker installation, this is an alternative (btw. this is faster than docker build).
2. `git clone git@github.com:piotrorlowski/frontend_challenge.git && cd frontend_challenge && touch app/.env`.
3. in `.env` put:

        SECRET_KEY='5_-tpc3t&v@s)m4ly&1$lmff2wn5xcvwdr-xe+gxw88xn^3qn4'
        ALLOWED_HOSTS=localhost
        AUTH_PASSWORD_VALIDATORS=''
        CORS_ORIGIN_WHITELIST=http://localhost:3000

4. `python3 -m venv venv`.
5. `source venv/bin/activate && pip install -r requirements.txt && ./manage.py migrate && ./manage.py runserver`.
6. Open other terminal and navigate to `frontend_challenge/frontend`.
7. `yarn && yarn start`.
8. Browser should open with app running.

# Description and usage

![React-App](https://user-images.githubusercontent.com/23028687/119269413-e0564b00-bbf7-11eb-9828-41ec8d18f38f.gif)

## App implementation

1. Data from csv is loaded into the database.
2. Data is serialized with the Django REST Framework and accessible at `/data/` and `/campaigns/` endpoints.
3. The `/data/` endpoint is for fetching different data.
4. The `/campaigns/` endpoint is mostly for fetching campaings options for the react select component (multiselect for selecting different campaigns).
5. There were 4 unique datasources, so I hardcoded them instead to fetch them from backend as it wasn't worth the effort at this point (file with extracted unique datasources can be viewed here https://github.com/piotrorlowski/frontend_challenge/blob/de3c41159c52cd5edbc267c4358f7fcd534cff73/datasource.txt, I removed it later as it wasn't needed).
6. In contrary to datasources there were 1828 unique campaigns, so I extracted them and created data model for them to store in db (file can be visible here https://github.com/piotrorlowski/frontend_challenge/blob/de3c41159c52cd5edbc267c4358f7fcd534cff73/campaign.txt, I removed it later as it wasn't needed).
7. I had to somehow control the number of requested objects, so I added 'Page size' input to manually control how many results I would like to get for data chart.
8. There isn't much styling in terms of RWD, but there could be, so data could be viewed on mobile devices with better UX, so better view it on desktop monitor.
9. I used the functional components approach and I used react hooks for handling state, though I don't have much experience with it (on daily basis I work in VueJS), so it probably could be improved.
10. I had some issues with axios as at the first aproach I wanted to just pass dynamic params to axios.get() but later it resolved that combined multiple choices (datasources and campaigns) had their spaces replaced by '+' instead of '%20' and '+' couldn't be read properly by DRF, so I decided to write some function to create dynamic urls for the requests.
11. I built three components `App.jsx` (main logic and state holder), `Sidebar.jsx` (as name suggests - sidebar with different data manipulation options) and `Chart.jsx` (chart for showing data).
12. I included linters and linted code both for frontend and backend.
13. I wrote some tests both for frontend and backend.

## UI and features explanation

15. Initially whole data is fetched but the number of results is reduced with 10 pageSize - it can be changed through 'Page size' input.
16. Multiple datasources and multiple campaigns can be added through selects in sidebar to requests.
17. Any changes have to be applied by clicking 'Apply' button.
18. When choosing campaign, first try to write some characters, so campaigns will be filtered by your typing. I added this solution because there were too many results. It could be improved to send requests when user is typing and fetch live data, but it would require more time to implement.
19. Not for every campaign there will be relevant results.
20. Time filtering could be applied with some calendar DatePicker lib on frontend, hadn't time for that unfortunately.
