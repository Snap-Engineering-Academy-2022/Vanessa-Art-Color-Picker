import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ArtworkCard(props) {
  return (
    <Card
      className="card"
      elevation={2}
      sx={{ maxWidth: 340, borderRadius: "2.5rem" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={props.height}
          image={props.image_url}
          alt={props.alt_text}
        />
        <CardContent>
          <Typography
            className="card-title"
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.title}, {props.date_display}
          </Typography>
          <Typography
            className="card-artist"
            variant="body2"
            color="text.secondary"
          >
            {props.artist_title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
