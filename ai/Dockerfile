# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container to /app
WORKDIR /app

# Add the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Make port 5001 available to the world outside this container
RUN chmod +x /app/app.py

# Make port 5001 available to the world outside this container
EXPOSE 5002

# Run app.py when the container launches
CMD ["python3", "app.py"]