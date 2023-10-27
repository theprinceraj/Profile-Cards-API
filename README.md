# Profile Cards API

![Profile Card Example](https://profile-cards-api.vercel.app/api/profile?name=John%20Doe&location=New%20York&socialMedia=GitHub&socialMediaUsername=johndoe&title=Web%20Developer&skills=HTML,CSS,JavaScript&imageLink=https://example.com/johndoe.png)

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
GET https://profile-cards-api.vercel.app/api/profile?name=John%20Doe&location=New%20York&socialMedia=GitHub&socialMediaUsername=johndoe&title=Web%20Developer&skills=HTML,CSS,JavaScript&imageLink=https://example.com/johndoe.png
```

This will return an image of a profile card with the provided information.

## Customization

You can customize the appearance of the profile card by modifying the HTML and CSS templates located in the `template` directory. Adjust fonts, colors, and layouts to suit your branding or design preferences.

## Dependencies

- Express.js: The web server framework for handling API requests.
- Puppeteer: Used to generate profile card images.

## Contributing

Contributions to this project are welcome. Feel free to open issues or pull requests to suggest improvements or report bugs.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Note:** Ensure that you have the necessary environment variables configured when deploying this project, especially in serverless environments.

For more information, please refer to the [documentation](https://github.com/your-repo-link) or [open an issue](https://github.com/your-repo-link/issues) if you encounter any problems or have questions.
