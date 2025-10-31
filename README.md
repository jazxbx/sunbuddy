## SunBuddy 😎☀️

SunBuddy is a modern web app that helps users stay safe while enjoying the sun. It displays the current UV index, local weather, and safe sun exposure times based on your location or a city search.

I made this because I've been burnt by the rays multiple times ( dyk you can get sunburn on a cloudy day? )  and wanted an easy way to track uv exposure. This helps users enjoy sunny or cloudy days without risking sun damage.

## Features

Detects your current location and fetches local UV & weather data.

Live UV Index — fetches the current UV levels using geolocation or city search

Safe Exposure Time Calculator — estimates how long you can stay in the sun before burning, based on your skin type

Weather Display — shows temperature and conditions in a clean, card-based layout

Sun Safety Tips — rotating tips on how to protect your skin and stay hydrated

Responsive UI — built with Tailwind CSS and styled for a bright, positive vibe

<img width="2736" height="1676" alt="image" src="https://github.com/user-attachments/assets/efdb5896-a24d-4289-9266-a9ef433e85ee" />


## How its made

#### Tech Stack

Next.js, TypeScript, Tailwind CSS,Tanstack Query OpenWeatherMap for geolocation, Open-Meteo for weather and currentuvindex for uv data

## What I Learned

Plan better when refactoring — so.. i dove in without a clear structure while refactoring and i ran into problems like my API not giving me the data I needed. It taught me the value of stepping back, mapping the data flow and switching to a different API. It was a good reminder to slow down, and create a flowchart. 

I learned to break problems into layers — fetching data, then parsing it, and when the API responses didn’t line up with what my app needed, I built helper functions to transform and format the data properly.

Building the UV and weather logic helped me understand how to chain APIs and manage state cleanly with TanStack Query. I need to do a deep dive on tanstack. 

I got better at debugging with intention — instead of guessing, I logged specific parts of the data flow to isolate where things went wrong. 

Designing the small UI details (cards, headers, and tooltips) taught me how to make data feel friendly and human, not technical or overwhelming.

Type safety with TypeScript- it helps catch bugs early and ensures that data from the api is handled safely.
