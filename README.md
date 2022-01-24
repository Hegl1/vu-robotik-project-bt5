# VU Einführung in die Robotik Project

## Project structure

```
/
├─ src/
│  ├─ backend/ - The Python backend using Flask
│  ├─ client/  - The Angular frontend
│
├─ dist/
│  ├─ ROS-Client.zip - The build project
│
├─ docs/
│  ├─ ROS-Client-API.oas3.yaml - The OpenAPIv3 documentation of the backend
│
├─ build.sh - A bash-script to create the build inside of the dist/ directory
```

## Development setup
### Backend
1. Install the python dependencies: `pip install -r requirements.txt`
1. Set the values inside of the `setup.json` file
1. Start the backend using `python3 main.py setup.json [port]` (default for the port is 5000)
1. Make sure you have a valid ROS installation, rospy is installed and the backend runs on the ROS-Master

### Frontend
1. Install the npm dependencies: `npm install`
1. Copy the `src/assets/config.example.json` file to `src/assets/config.json` and set the `apiUrl` value to the url of the backend:
    ```
    {
        "apiUrl": "http://localhost:5000"
    }
    ```
    **Info:** When the project is build, the backend url is set automatically, so the `apiUrl` key *should not* be set
1. Start the frontend using `npm run start` and open it in the browser: `http://localhost:4200`

## Building
To build the project you have to run the `build.sh` bash-script. It will build the Angular client and integrate it into the Flask backend. The finished build is then bundled as a ZIP and stored in the `dist/` directory.

## Deploying the build
1. Make sure you set the correct values inside of the `setup.json` file
1. Start the server using `python3 main.py setup.json [port]`
1. The frontend is now reachable at `http://localhost:<port>` (default for the port is 5000)
