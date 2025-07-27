# Intialization
 - tailwind css and daizy ui for design.
 - vite+react application
 - Add navBar component to app.jsx
 - Installed react router dom
 - Installed axios 
 - CORS - installed cors in backend=>add middleware
 - When you are making API call so pass axios=>{withCredentials: true}
 - Installed redux toolkit
 - LOgin and see if your data is coming in redux store.
 - Navbar should update as soon as user login
 - Built logout feature
- Build connections page
- Build request page
- Build feature for accepting/rejecting request.
# Body:
 - Navbar
 - Route=/ => Feed
 - Route=/login => Login
 - Route=/connection=>connection
# Deployment:
 - Create instance and choose your  cloud system on amazon AWS
 - Open the terminal
 -  Run the following commands:
    1. ssh -i "devcommits-secret.pem" ubuntu@ec2-51-20-6-34.eu-north-1.compute.amazonaws.com
    2. Install node version (curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
       sudo apt-get install -y nodejs)
    3. git clone
    4. Frontend:
       - npm install -> for dependencies
       - npm run build
       - sudo apt update
       - sudo apt install nginx
       - sudo systemctl start nginx
       - sudo systemctl enable nginx
       - Copy code from dist(build files) to /var/www/html/
       - sudo scp -r dist/* /var/www/html
       - Enable port :80 of your instance
    5. Backend:
       - allowed ec2 instance public IP on mongodb server
       - npm install pm2 -g
       - pm2 start npm -- start
       - pm2 logs
       - pm2 list, pm2 flush, pm2 stop, pm2 delete
       - config nginx- /etc/nginx/sites-available/default
       