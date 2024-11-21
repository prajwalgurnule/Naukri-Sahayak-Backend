# Use an official Node.js runtime as a parent image
FROM node:16

# Install Python (required for feedback_model.py) and related tools
RUN apt-get update && apt-get install -y python3 python3-pip && apt-get clean

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json for installing Node.js dependencies
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Expose the port your server runs on (5000)
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
