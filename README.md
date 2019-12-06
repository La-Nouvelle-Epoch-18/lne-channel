[![Actions Status](https://github.com/La-Nouvelle-Epoch-18/lne-channel/workflows/Docker%20Image%20CI/badge.svg)](https://github.com/La-Nouvelle-Epoch-18/lne-channel/actions)

# lne-channel

The purpose of this micro-service is to provide a list of items retrieved from RSS Feed.
Any university can add it's own RSS feed to the list.

## API endpoint

### Retrieve items

* `GET /rss` Retrieve last 50 items
* `GET /rss?user=x` Retrieve last 50 items from the specified university.

*Response:*
An array of object:
* `_id`: Internal id (hash)
* `title`: Title of the item (string)
* `link`: URL of the item (string)
* `ts`: ISO DateTime (string)
* `content`: Content of the item (string)
* `__v`: Version of the item (number)

*Example:*
```json
[
  {
    "_id": "5de9bb581763577a9bdf0d28",
    "title": "R. Kelly Is Charged With Using Bribes to Marry Aaliyah at Age 15",
    "link": "https://www.reddit.com/r/news/comments/e6pclz/r_kelly_is_charged_with_using_bribes_to_marry/",
    "ts": "2019-12-05T23:03:52.000Z",
    "content": "&#32; submitted by &#32; <a href=\"https://www.reddit.com/user/aacool\"> /u/aacool </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/news/\"> r/news </a> <br/> <span><a href=\"https://www.nytimes.com/2019/12/05/nyregion/rkelly-aaliyah.html?smid=nytcore-ios-share\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/news/comments/e6pclz/r_kelly_is_charged_with_using_bribes_to_marry/\">[comments]</a></span>",
    "__v": 0
  },
  {
    "_id": "5de9bad51763577a9bdf0cf4",
    "title": "⚡ Télécharger le projet de loi relatif à la communication audiovisuelle",
    "link": "https://www.nextinpact.com/news/108478-telecharger-leprojet-loirelatif-a-communication-audiovisuelle.htm",
    "ts": "2019-12-05T18:55:04.000Z",
    "content": "<p class=\"actu_chapeau\">On pourra t&eacute;l&eacute;charger ci-dessous le projet de loi sur l'audiovisuel. Nous reviendrons ces prochains jours sur ses principales&nbsp;dispositions. Le texte consacre notamment la disparition de la Hadopi et le transfert de ses comp&eacute;tences au CSA. Celui-ci est rebaptis&eacute; pour l'occasion Arcom, dot&eacute; de nouvelles missions.</p><ul><li><a href=\"https://www.nextinpact.com/news/108478-telecharger-leprojet-loirelatif-a-communication-audiovisuelle.htm\">Lire la suite</a></li></ul>",
    "__v": 0
  }
]
```

### Add RSS source

`POST /rss`
*Body:*
* `url`: url of the RSS source.

Require to be authenticated with the `Authorization` header.

*Response:*
No response, status 204 in case of success.
In case of error, the `err` key will contain the error.


## Architecture

![diagram](resources/diagram.png)

## Deploy

This api has a docker image (published on [Docker hub](https://hub.docker.com/repository/docker/nouvelle0epoch/lne-channel)).
To run it, you only need to install docker.
A `docker-compose.yml` file is provided to simplify the deployment.
