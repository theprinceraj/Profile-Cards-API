# Profile Cards API

![Profile Card Example](https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Software%20Developer&imageLink=https://images.unsplash.com/photo-1514501259756-f4b6fbeffa67&socialMedia=Linkedin&socialMediaUsername=theprinceraj)

The Profile Cards API is an open-source service that generates profile card images based on the information provided via API requests. These profile cards can be used in various applications, including GitHub profiles, personal websites, and more.

## Usage

To generate a profile card, make a GET request to the API with the following query parameters:

- `name`: The name to be displayed on the profile card.
- `location`: The user's location or city.
- `title`: The user's job title or description.
- `imageLink`: The URL of the user's profile picture.
- `socialMedia`: The name of social media whose username you want to show
- `socialMediaUsername`: The username of the previously specified social media

Example API request:

```plaintext
GET https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://images.unsplash.com/photo-1514501259756-f4b6fbeffa67&socialMedia=Github&socialMediaUsername=theprinceraj
```

This will return an image of a profile card with the provided information.

## Customization

It does not support design customisation as of now but I plan to implement it sometime later. Contributions in this regard are most welcome.

## Dependencies

- Express.js: The web server framework for handling API requests.
- canvas-constructor: Used to generate profile card images.
- canvas: Used to generate profile card images.

## Contributors

Contributions to this project are welcome. Feel free to open issues or pull requests to suggest improvements or report bugs.

Once we have contributors, we will list them down in this section. I hope we will have more soon!❤️
1. sarcasterXO
2. theprinceraj
3. 
## License

This project is open-source and available under the [MIT License](LICENSE).

---
