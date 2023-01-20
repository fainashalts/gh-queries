import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Your GitHub personal access token
const token = process.env.GITHUB_TOKEN;

// this function hits the GH API to find out how many projects use the truffle-config file
// running this in your terminal only returns 100 records at a time, so there can definitely
// be some fine-grained work here to get all the records via pagination
// and/or add more specific search terms
async function searchProjects(fileName) {
  const query = fileName + ' in:file';
  const url = `https://api.github.com/search/code?q=${query}`;

  try {
    // Send a GET request to the GitHub API with authentication
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });

    // Extract the data from the response
    const { total_count, items } = response.data;

    // Print the number of projects found
    console.log(`Number of projects found: ${total_count}`);

    // Print a list of URLs for the projects
    items.forEach(item => {
      console.log(item.html_url);
    });
  } catch (error) {
    console.error(error.response.data);
  }
}

const fileName = process.argv[2];
searchProjects(fileName);
