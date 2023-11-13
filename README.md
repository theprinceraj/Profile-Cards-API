# Profile Cards API

![Profile Card Example](https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&socialMedia=Github&socialMediaUsername=theprinceraj&title=Web%20Developer&skills=HTML,CSS,JavaScript&imageLink=https://i.ibb.co/CmPRHxR/IMG-20231010-085955.jpg)

The Profile Cards API is an open-source service that generates customizable profile card images based on the information provided via API requests. These profile cards can be used in various applications, including GitHub profiles, personal websites, and more.

## Usage

To generate a profile card, make a GET request to the API with the following query parameters:

- `name`: The name to be displayed on the profile card.
- `location`: The user's location or city.
- `socialMedia`: The social media platform (e.g., GitHub, Twitter).
- `socialMediaUsername`: The username/handle on the social media platform.
- `title`: The user's job title or description.
- `skills`: A comma-separated list of skills.
- `imageLink`: The URL of the user's profile picture.

Example API request:

```plaintext
GET https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&socialMedia=Github&socialMediaUsername=theprinceraj&title=Web%20Developer&skills=HTML,CSS,JavaScript&imageLink=https://i.ibb.co/CmPRHxR/IMG-20231010-085955.jpg
```

This will return an image of a profile card with the provided information.

## Customization

It does not support design customisation as of now but I plan to implement it sometime later. Contributions in this regard are most welcome.

## Dependencies

- Express.js: The web server framework for handling API requests.
- canvas: Used to generate profile card images.
- @napi-rs/canvas: Used to generate profile card images.
- node-fetch: Used to fetch the image from given link that is supposed to be displayed as your profile picture

## Contributing

Contributions to this project are welcome. Feel free to open issues or pull requests to suggest improvements or report bugs.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Note:** Ensure that you have the necessary environment variables configured when deploying this project, especially in serverless environments.
