# What it does
1. Study Hour receives user's location and detects the zone/field the user is in. Zones are defined polygons in the climate corporation database that can be customized to include any building or area like the Union or the Siebel building.
2. A user then selects how many hours he/she wants to study at their current location/zone. Once selected, the input time triggers a countdown.
3. During the countdown or "the study hour", the app constantly monitors user's location and displays messages like "Keep Going!" to encourage the user to stay in the zone and study.
4. If the user leaves the zone before the countdown, the pebble watch notifies the user and urges him/her to study harder next time.
5. If the user successfully completes the study hour within the designated area, the watch will display a congratulation message.

# How we built it
Our application was written in CloudPebble using JavaScript. The application uses Climate Corporation’s Fields API to access custom fields that include study areas on campus. The application then checks to see if the user is in one of these fields, and if so, it’s time to study!
