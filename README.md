# Simple Dashboard to visually explain the Brexit Referendum results.

This data dashboard displays stats from the EU Referendum results 2016.
It shows mutliple charts with data from different dimensions and there's also text users can read to navigate the site.
Users will find bar charts and  pie charts  to show this data. Users will also be able to filter informations by clicking on the graphs or use a select button to choose the region they are interested in.

## UX

This website is for everyone that would like a better understanding of the results of the referendum passed the basic result. By filtering by region or attandance the user will be able to understand why this result has become so divisive and the country is struggling to implement it.

## Demo
A live demo can be found [here](https://luigilangella.github.io/Milestone-Project-Two/).

### Wireframes

The wireframe i designed reflects very much what the end product is, a simple to navigate dashboard with all the informations needed to make it usefull.
![wireframe2.png](/static/images/mockup.png)

## Features
A brief introduction to the referendum, a select button to choose the region of interest, 5 different charts to compare diverse aspect of the vote, a reset button and a toTop button to return to the top of the page.

##### Navbar
* Bootswatch themes was used to style the page and to fix top navbar and footer.


### Features Left to Implement

In the process of this milestone project I considered adding more charts and table but i feel that would have taken away the simplicity of use of the dashboard, but i'm planing to add more data and some links to the navbar to take an even more broad view of the result.

## Technologies Used

##### HTML5
Throughout the webpage i've tried to use semantic approch and HTML5 was the language of choice.

##### CSS3
Most of the styling has been innherited from the CSS bootwatch template that ive used, and also a style.css separate file helped me correct and implement the changes i wanted to make to the page.

##### JavaScript 
JS was used to queue my charts, and reset buttons and also contributed to specific functions used to create functionality on the page.

##### Crossfiilter
For my interactive charts I used crossfilter technology.

##### D3
This data-driven document technology was used to fuse chart data together to make the charts with the help of HTML ids.

##### DC
DC's library of code was used to make the charts. I took the code from the website and then changed dimensions, numbers and 
attributes to suit my needs for those charts.

##### CSV
This project takes data from the .csv file only.

##### GitHub
Github was used consistently throughout the project to ensure version control and changes commited regulary.

##### Balsamiq
At the start of this project I used this service to brainstorm and display my ideas for the look of the site. See above in Wireframes.

##### Bootstrap 3.4.1
I used this technology for its framework and the grid system, which helped make my site as responsive as possible.

## Testing
 This site was tested across multiple browsers (Chrome, Safari, Internet Explorer, FireFox) and on multiple mobile devices (iPhone 4, 5, 7: Chrome and Safari, iPad, Samsung Galaxy) to ensure compatibility and responsiveness. Most of the styling and coding was done with the help of the Crome Developer Tools, then implemented in Visual Studio Code.
 The HTML5 was tested with a markup [validation service](https://validator.w3.org/).
 The CSS3 was tested with a CSS [validation service](https://jigsaw.w3.org/css-validator/).
 The javascript was tested with jslint and its free from errors except for the one it shows due to lack of compatibility with dc.js but the code is working fine.

## Deployment
This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named `index.html`.

To run locally, you can clone this repository directly into the editor of your choice by pasting `git clone https://github.com/luigilangella/Milestone-Project-Two.git` into your terminal. To cut ties with this GitHub repository, type `git remote rm origin` into the terminal.

**This is for educational use.** 