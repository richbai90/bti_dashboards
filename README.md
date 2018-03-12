To demo this app, download the contents of the build directory and place the files in the following folder within supportworks:

```/Supportworks Server/html/clisupp/dashboard_alpha```

Naviage to <server url>/sw/clisupp/dashboard_apha in a web browser, and login with your supportworks credentials.

If all was done correctly you should be greeted with something like below:

![login](https://i.imgur.com/x7sePjN.png)
![app](https://i.imgur.com/XACkfTd.png)

## Things to be aware of:
* The four colored squares at the bottom of the left hand menu are themes. Clicking on any one will change the colors used to render the charts.
  * This is clumsy UI that will be polished and exists currently for demo purposes only.
  * The colored squares indicate the overall theme color, the charts decidedly do not use the primary theme color, they use a spread of secondary colors designed to complement the primary color
  * There is a known issue in the themes currently. The correct behavior is that when a theme is selected, the app determines based on the luminocity of the given color, whether we should render it on a dark background or a light background. This currently does not work but will work in the future.
* The queries driving the dashboards are these:
  * Line Chart: ```sql select count(callref) as y, callclass as chart, date_format(from_unixtime(logdatex), '%Y') as x from opencall WHERE callclass in ('incident', 'service request') group by x, chart order by x, chart asc```
  * Bar Chart: ```sql select count(callref) as y, callclass as x from opencall group by callclass```
* There is no special formatting required to get these queries into the chart format they are in now. The application parses the query results and chooses the optimal approach for placing the data within a chart.
  * The implication of this is that when we build the UI for creating charts, anyone with even a limited knowledge of SQL can build the reports they need. No coding knowledge required.
* Currently the data pulls from Supportworks, and uses Supportworks to handle user authentication. As the app is designed today, that can be unplugged and any (or multiple) data sources can be plugged in its place. Longterm, the goal is to make this an all in one reporting solution for a variety of applications, not just supportworks.


## Things not demoed here:
* Creation of charts
* Creation of dashboards
* Switching dashboards
* Admin functions of any kind

This is a proof of concept and your feedback is welcome and encouraged. The UI is still very much in a state of flux, and input will be highly regarded.