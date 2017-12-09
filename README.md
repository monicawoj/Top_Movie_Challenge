# Top_Movie_Challenge
This collection of visualizations serves as a hub for interactive insights based on the top 100 grossing movies, by year, for 2014, 2015, and 2016. The dataset has been scrubbed from Box Office Mojo.

I am happy to elaborate on the visualizations or any of the sections below by phone or in person if needed.

## Main Objective:
A lot goes into making a movie. But a lot of thinking goes into it's production and distribution as well. These visuals seek to shed light on some characterstics of the top movies that can help aspiring filmmakers set themselves up for the largest succcess (apart from actual film quality.)

## The Process:
- Explored data using various resources (Excel pivots / SQL for grouping)
- Explored various connections between metrics, dimensions, and dates (identify any interesting patterns)
- Decided whether the data set was better suited for a user-defined visualization (tool) or a story-driven set of visualizations (message/communication) - explain how I chose a combination of the two - in this case I choose to merge the two through the use of a user-input filter by genre function
- Form a logical ordering of the insights identified in exploration (ensure that this story can serve a larger analytical purpose)
- Laid out story structure in HTML
- Created individual JavaScript files (using D3 to power the visuals) for each of the visualizations
- Created JavaScript file to format data as appropriate, this file calls the individual visualization JS files
- Applied styling to visualizations and text through CSS

## Challenges:
- Data cleansing: For the length visualizing movie title length vs. total # of Top 100 movies (2014-2016) I needed an accurate count of movie title characters. However, manipulating this data to provide the length of each title was not as simple as a .length function, as some of the titles contained extraneous information (e.g., the year of production.) Upon this realization, I addressed the problem by removing all information within parentheses. 
- Selecting Dataset of Focus: After landing on the idea of beginning the user's viewing journey with a user-input selection for genre, I needed to filter the dataset by appropriate genre. However, as there were too many individual genres (some with only one data point) I decided to instead focus on genre elements (e.g., instead of "Adventure Drama" this data point would be treated as containing the genre elements of "Adventure" and "Drama." This provided me with more data points per genre, which could lead to richer insights.
- Overlapping data: Given the challenge and solution above, I was left with overlapping "genre element" sets. That is, one movie could fall under "Adventure" and under "Drama." In order to capture all movies within a specific genre, I created a filter that would select the data set of focus based on the top 5 elements. With this logic, if the movie contains two genre elements, that data point can be viewed in visualizations of both of those genres.
- Data Formatting: the "Total Gross Sales" and "Opening Weekend Gross Sales" were both stored as strings. In order to use these in the visualization, I first needed to remove non-integer characters from the string and change it to numerical format. In order to then label points with currency figures, I created a "currency" function to add the extraneous characters (such as the dollar sign $) back in. This allowed those data points to be more conducive to human user understanding.
- Making visualizations responsive upon window refresh: In order to make the visualizations responsive upon a window resize, I adjusted the width attribute of each svg containing a chart to be relative to the window.innerWidth. If the user resizes the window and hits refresh, the visuals should dynamically adjust to fit within the page width.

## Next Steps:
I'd like to continue exploring the "before" and "after" of producing a hit movie through additional datasets. For example, upon the availability of weekly gross sales, it would be interesting to explore the general trajectory of film sales over time. Does this also follow a linear trend? Is there a clear relationship of decreasing marginal returns to each additional week after the film has been introduced? Does this plateau?

It would also be interesting to look at other components such as language, lead actor, and lead actress in a movie as I would imagine these would also have a high effect on viewership.

## Recommendations:
- Best if viewed on desktop in Firefox or Chrome
- Click 'Refresh' on browser to re-scale visuals after resizing window
