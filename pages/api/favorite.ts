import { NextApiRequest, NextApiResponse } from "next";

import { without } from "lodash";
import prismadb from "../../lib/prismadb";
import serverAuth from "../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currUser } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }
      const user = await prismadb.user.update({
        where: {
          email: currUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      // get the user
      const { currUser } = await serverAuth(req);
      //   get the movie id
      const { movieId } = req.body;
      //    find the movie id
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) {
        throw new Error("Invalid ID");
      }
      // update the favorites
      const updateFavoriteIds = without(currUser.favoriteIds, movieId);
      //   update the user
      const user = await prismadb.user.update({
        where: {
          email: currUser.email || "",
        },
        data: {
          favoriteIds: updateFavoriteIds,
        },
      });
      return res.status(200).json(user);
    }

    return res.status(405).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}
