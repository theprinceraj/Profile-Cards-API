const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Define your API routes
app.use('/api', require('./routes/profile'));

app.get('/', (req, res) => {
    res.send("Yea, I am here!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Test URL: http://localhost:3000/api/profile?name=Prince%20Raj&location=India&socialMedia=Github&socialMediaUsername=theprinceraj&title=Web%20Developer&skills=HTML,CSS,JavaScript&imageLink=https://cdn.discordapp.com/avatars/564327207133249536/2a80d088463a3751c63ebb0b0b64f0e9.png?size=1024