# INSTALLATION

1. `git clone git@github.com:piotrorlowski/frontend_challenge.git && cd frontend_challenge && touch .env`.
2.  in `.env` put:

        SECRET_KEY='5_-tpc3t&v@s)m4ly&1$lmff2wn5xcvwdr-xe+gxw88xn^3qn4'
        ALLOWED_HOSTS=localhost
        AUTH_PASSWORD_VALIDATORS=''
        CORS_ORIGIN_WHITELIST=http://localhost:3000

3. Inside `frontend_challenge/` run `docker-compose up`.
4. Go to `http://localhost:3000/`.

# DESCRIPTION AND USAGE

![image](https://user-images.githubusercontent.com/23028687/119056746-82452000-b9cb-11eb-9724-a761095b813e.png)

1. Data from csv is loaded into the database.
2. Data is serialized with the Django REST Framework and accessible at `/data/` and `/campaigns/` endpoints.
3. The `/data/` endpoint is for fetching different (csv) data.
4. The `/campaigns/` endpoint is mostly for fetching campaings options for the react select component (multiselect for selecting different campaigns).
5. There were 4 unique datasources, so I hardcoded them instead to fetch them from backend as it wasn't worth the effort at this point (file with extracted unique datasources can be viewed here https://github.com/piotrorlowski/frontend_challenge/blob/de3c41159c52cd5edbc267c4358f7fcd534cff73/datasource.txt, I removed it later as it wasn't needed).
6. In contrary to datasources there were 1828 unique campaigns, so I extracted them and created data model for them to store in db (file can be visible here https://github.com/piotrorlowski/frontend_challenge/blob/de3c41159c52cd5edbc267c4358f7fcd534cff73/campaign.txt, I removed it later as it wasn't needed).
7. I had to somehow control the number of requested objects, so I added 'Page size' input to manually control how many results I would like to get for data chart.
8. I tried to reflect the look of the chart from the document as much as I could though I don't have much experience in handling charts, especially as react libraries.
9. I think chart could get some improvement, maybe I could try out some other library, but that would require more time.
10. There isn't much styling in terms of RWD, but there could be, so data could be viewed on mobile devices with better UX, so better view it on desktop monitor.
11. I used the functional components approach and I used react hooks for handling state, though I don't have much experience with it (on daily basis I work in VueJS), so it probably could be improved.
12. I had some issues with axios as at the first aproach I wanted to just pass dynamic params to axios.get() but later it resolved that combined multiple choices (datasources and campaigns) had their spaces replaced by '+' instead of '%20' and '+' couldn't be read properly by DRF, so I decided to write some function to create dynamic urls for the requests.
13. I built three components `App.jsx` (main logic and state holder), `Sidebar.jsx` (as name suggests - sidebar with different data manipulation options) and `Chart.jsx` (chart for showing data).
14. I included linters and linted code both for frontend and backend.
15. Initially whole data is fetched but the number of results is reduced with 10 pageSize - it can be changed through 'Page size' input.
16. Multiple datasources and multiple campaigns can be added through selects in sidebar to requests.
17. Any changes have to be applied by clicking 'Apply' button.
18. When choosing campaign, first try to write some characters, so campaigns will be filtered by your typing. I added this solution because there were too many results. It could be improved to send requests when user is typing and fetch live data, but it would require more time to implement.
19. Not for every campaign there will be relevant results.
20. Time filtering could be applied with some calendar DatePicker lib on frontend.
