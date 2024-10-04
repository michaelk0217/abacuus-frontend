## how can i install nginx for next.js app on aws EC2 instance?

To install Nginx for your Next.js app on an AWS EC2 instance, you can follow these steps:

### Step 1: Update Your EC2 Instance

After SSH-ing into your EC2 instance, start by updating the package manager to make sure you have the latest packages.

```bash
sudo apt update
sudo apt upgrade
```

### Step 2: Install Nginx

You can install Nginx by running the following command:

```bash
sudo apt install nginx -y
```

After installation, start the Nginx service:

```bash
sudo systemctl start nginx
```

You can also enable Nginx to start automatically on boot:

```bash
sudo systemctl enable nginx
```

### Step 3: Configure Nginx for Next.js

Nginx needs to be configured as a reverse proxy to serve your Next.js app. Here's how to set it up.

1. **Edit the default Nginx configuration file**:

   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

2. **Modify the configuration** to serve your Next.js app. Replace the contents of the file with the following:

   ```nginx
   server {
       listen 80;
       server_name your_domain_or_ip;

       location / {
           proxy_pass http://localhost:3000;  # Port where your Next.js app runs
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Replace `your_domain_or_ip` with your domain name (if you have one) or the public IP of your EC2 instance.

3. **Test the Nginx configuration**:

   ```bash
   sudo nginx -t
   ```

   If everything is correct, you'll see a message that the test was successful.

4. **Restart Nginx** to apply the new configuration:

   ```bash
   sudo systemctl restart nginx
   ```

### Step 4: Install Node.js and PM2 (Process Manager for Node.js)

Next.js requires Node.js to run. Install Node.js and PM2 to ensure your app runs as a background service.

1. **Install Node.js**:

   ```bash
   curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

2. **Install PM2**:

   ```bash
   sudo npm install pm2 -g
   ```

### Step 5: Deploy Your Next.js App

1. **Clone your Next.js project** to the EC2 instance (if you haven't already). For example:

   ```bash
   git clone https://github.com/your_username/your_nextjs_repo.git
   cd your_nextjs_repo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Build your Next.js app**:

   ```bash
   npm run build
   ```

4. **Start your Next.js app with PM2**:

   ```bash
   pm2 start npm --name "nextjs-app" -- start
   ```

   This command will start your Next.js app in the background.

5. **Ensure PM2 restarts on server reboot**:

   ```bash
   pm2 startup
   pm2 save
   ```

### Step 6: Open Security Groups on AWS

In the AWS Management Console:

1. Go to **EC2** > **Security Groups**.
2. Edit the security group attached to your EC2 instance to allow inbound traffic on HTTP (port 80) and HTTPS (port 443 if using SSL).

### Optional: Step 7: Set Up SSL with Let's Encrypt (for HTTPS)

1. **Install Certbot** (Let’s Encrypt tool for SSL certificates):

   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain an SSL certificate** for your domain:

   ```bash
   sudo certbot --nginx -d your_domain
   ```

   Follow the prompts to complete the setup. Certbot will automatically configure Nginx for SSL.

3. **Renew SSL certificates automatically**:

   ```bash
   sudo crontab -e
   ```

   Add the following line to renew the certificates automatically:

   ```bash
   0 0 * * * /usr/bin/certbot renew --quiet
   ```

Now your Next.js app should be running behind Nginx on an AWS EC2 instance!

Let me know if you need more details on any step.

## how can I check status of nextjs app using pm2?

To check the status of your Next.js app using PM2, you can use the following command:

```bash
pm2 status
```

This will display a table with information about all the applications managed by PM2, including:

- **App name**: The name you gave the app when starting it (e.g., "nextjs-app").
- **ID**: The process ID assigned by PM2.
- **Mode**: Whether the app is running in fork mode or cluster mode.
- **PID**: The Process ID of the running app.
- **Status**: The current status (e.g., online, stopped, errored).
- **Restarts**: How many times the app has been restarted.
- **Uptime**: How long the app has been running.
- **Memory**: The amount of memory used by the app.
- **CPU**: The percentage of CPU used by the app.

### Example Output:

```bash
┌─────┬───────────────────┬──────┬───────┬────────┬───────┬──────┬──────────────┬────────┬───────────┐
│ id  │ name              │ mode │ status│ restart│ uptime│ cpu  │ mem          │ user   │ watching  │
├─────┼───────────────────┼──────┼───────┼────────┼───────┼──────┼──────────────┼────────┼───────────┤
│ 0   │ nextjs-app        │ fork │ online│ 0      │ 2h    │ 0.1% │ 60.0 MB      │ ubuntu │ disabled  │
└─────┴───────────────────┴──────┴───────┴────────┴───────┴──────┴──────────────┴────────┴───────────┘
```

### Other Useful PM2 Commands:

- **View logs**:

  ```bash
  pm2 logs nextjs-app
  ```

  This command allows you to view real-time logs of your app.

- **Restart the app**:

  ```bash
  pm2 restart nextjs-app
  ```

- **Stop the app**:

  ```bash
  pm2 stop nextjs-app
  ```

- **Delete the app from PM2**:

  ```bash
  pm2 delete nextjs-app
  ```

- **Show detailed info about a specific app**:
  ```bash
  pm2 show nextjs-app
  ```

These commands will help you manage your Next.js app effectively with PM2. Let me know if you need more information!
