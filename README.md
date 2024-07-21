<h1>Swasthya - Your personal AI powered Healthcare companion</h1>
<h2>Introduction</h2>
<p>Swasthya is an AI powered health recommendations app which leverages the power of Llama 3 model from Meta.
It holds the power to revolutionize this domain by providing personalized wellness recommendations based upon user’s data and preferences.</p>
<h2>Features</h2>
<ul>
  <li>Using Google OAUTH for user login</li>
  <li>To use Llama 3 for answering health related doubts</li>
  <li>Dynamic article and video recommendations  based on user’s searches with the chatbot</li>
  <li>To allow users to discover prompt related medical centers near them  </li>
  <li>To save user preferences like previously visited clinics or their medications</li>
</ul>
<h2>TechStack</h2>
<ul>
  <li><strong>Flutter Framework</strong> for frontend, following the <strong>BloC Architecture</strong></li>
  <li><strong>Express JS Framework</strong> for backend, following the <strong>MVC Architecture</strong></li>
  <li><strong>GORQ API</strong> will be used to run <strong>Llama 3 model</strong></li>
</ul>
<h2>Setup (for Backend)</h2>
<ul>
  <li>Clone the repo and cd to the project directory</li>
  <li>Copy sample.env to .env and update the environment variables</li>
  <li>Run <strong>"npm i"</strong> to install all the dependencies</li>
  <li>Open mysql shell and copy all queries into the mysql shell </li>
  <li>To run for development server use <strong>"npm run start:dev"</strong></li>
  <li>To run for deployment use <strong>"npm run start"</strong></li>
   
</ul>
<h2>Working</h2>
<ul>
  <li>For the very first use, user will be prompted to add general details realated to his health and Google OAuth will be used for user login and registration</li>
  <li>The general details will be stored and sent to the Llama 3 based model for processing and cater to the user's needs based on them</li>
  <li>User will be prompted with articles/videos recommendations on the home screen, fetched from the Web by the model, using user's general details</li>
  <li>These recommendations will drive the user to opt for a better lifestyle</li>
  <li>Then comes the main implementation of AI, the Chat Option, which will allow user to share his health related doubts/questions</li>
  <li>These questions can be wide ranging from medications to nearest hospitals, from belly fat reduction tutorials to diet plans for diabetes patients and much more</li>
  <li>The model at the backend will use these prompts along with user data to generate tailored responses, by fetching the appropriate data</li>
  <li>Moreover, the model will be trained as well to update the recommendations on the Home tab, based upon recent chats</li>
  <li>Furthermore, the user will have the ability to save response snippets for future reference under the Profile tab, along with user's general details</li>
</ul>
