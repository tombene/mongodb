# mongodb
Mongo db integration


## This site will have the following options: 
* Scrape www.BoardGameGeeks.com for the top ranked games and saving name, rank, image link, and link to details page.
* Add notes to one of the games.
* Delete notes to one of the games.

## Scraper
The scraping was done using cheerio. The more challenging part of scraping this site was all the different nested parts and changing names. 

## Mongoose 
This handled all the models and schemas and allowes you to link two or more documents. In this case that was the Game table with the notes table. This will allow you to use a method called populate.





