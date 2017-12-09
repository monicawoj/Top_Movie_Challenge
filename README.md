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

## Next Steps:
I'd like to continue exploring the "before" and "after" of producing a hit movie through additional datasets. For example, upon the availability of weekly gross sales, it would be interesting to explore the general trajectory of film sales over time. Does this also follow a linear trend? Is there a clear relationship of decreasing marginal returns to each additional week after the film has been introduced? Does this plateau?

It would also be interesting to look at other components such as language, lead actor, and lead actress in a movie as I would imagine these would also have a high effect on viewership.

## Recommendations:
- Best if viewed on desktop in Firefox or Chrome
- Click 'Refresh' on browser to re-scale visuals after resizing window
