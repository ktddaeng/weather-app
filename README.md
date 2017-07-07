I chose Andy Lin and Michelle Lee's design for a weather app, but I made some changes as well as implemented some of the extra features, which I will explain here:

1. Search Bar
    I decided to rely entirely on an entire bar than add a submit button because that would clutter the layout of the app. The search bar also clears when you click on it again, and it glows!
    
2. Displaying the location in a div container rather than the search bar.
    By displaying the location in a more easy to see location and in larger font, the user can know where the weather report is coming from.

3. Scrollable Forecast
    For a more comfortable viewing experience, I decided to make the forecast scrollable adjustable, and kept everything else centered. This way you can still see the current conditions while scrolling through the forecast. To keep up with the minimalistic design, the container for the forecast has been made transparent and a simple scrollbar has been added to indicate scrolling. Instead of a five day forecast, which would probably fit the screen, I added a few more days so you can see how the scrolling works.
    
4. Color Scheme
    The original colors in the design were too light against the white text, so I made sure to darken the colors so they're more visible. Also I figured out how to make the icon go to the background, so it fits more closely with the original design.
    
5. Hot and Cold
    I did allow for the background gradient to switch colors depending on the current weather, but only two modes are hot and cold. There is a small portion of code in view() that switches the id tag of the body so it takes a different color. This is not affected by nighttime or daytime, however.
    
6. Neko Mode
    Since the original design had two types of icons, I decided to allow the user to use both. A button near the search bar allows the user to toggle between Neko Mode and Standard Mode.

------------------------

From how I understood the Model-Control-View method, model was for storing all the data obtained from the JSON data, while view was to control the appearance (i.e. divs and headers), and control was all the button actions. The webpage is divided into 4 parts: The search bar, current conditions, forecast, and the footer.

1. The Search Bar. This one was really simple and didn't require much Javascript, so the only thing that required any coding was fetching information from the Yahoo servers and clearing the search bar whenever clicked on. I used a bit of CSS to make the search bar fit the design scheme of the original layout. Both Names and Zipcodes work on the searchbar, but if the fetch function can't find it, then an alert will pop up and say that "Location not found".

2. Current Conditions exists as one div container with multiple div containers nested in each other, which I must admit isn't the best idea, but I chose to do it this way because it's easier for me to stack things together and format it in CSS, with my current limited knowledge. All current information is stored in the model() object, and all the building stuff goes into the view() object. When the view() object is constructed, all the data from the model() object gets extracted and assembled together. The only dynamic feature is Neko Mode, which requires a few functions of its own so we can access the icons easily without having to redo the entire layout again.

3. Forecast is in another div container, and I made an object in mode() for these entries called ForecastBox and put all the stuff like temperature and status in separate variables in the ForecastBox. This way, information is easier to access in the code. When the time comes to display the forecast, I simply run the array of ForecastBoxes into the array. The structure of the displayed ForecastBox is similar to the Current Conditions container, just a few divs nested in one div.

4. The footer, of course, is for credit, so names and Yahoo's logo goes down there. I made sure that it's at the bottom of the page at all times, and doesn't interfere with the main content whenever things get shuffled around.

5. Neko Mode - To avoid wasting computation time, the view() object has a few functions exclusive for image changing that allows only the icons to be changed, while the other information is left undisturbed. The Yahoo API has about 44 codes for various descriptions, so I used another function to give a number from 1-6 for simplcity. To make things even easier, I numbered the images so I could easily write up the source path with the number I got from getCode(). That way when we toggle between Neko Mode and Standard Mode, the only things that changes are the icons, not the entire view() model.

6. Responsive Design - I didn't do too much, since the layout and the design is already really good for both small and large screens, but I changed some things to accommodate the cacomodate a smaller screen by media queries. Nothing much has changed except for text formatting and making buttons, forecast window, and input windows wider. The forecast's scrollbar goes away when you make a narrow screen because you can already scroll on a smartphone. The rest is very minor changes, such as making a changing background on the individual forecast entries and removing the background accent as desired by the original design.

7. Extraneous Libraries - I only primarily used webkit extensively for touching up the CSS of the webpage, such as the scrollbar and searchbar design. All I did was change the color a bit and gave the follow features more rounded edges. The gradient background is meant to work for virtually almost every browser, hence the use of webkit and other libraries depending on the browser, but that was presented as an example in lecture. But this should explain why the CSS validator is whining about webkit and moz and whatnot.
