import { Injectable } from '@nestjs/common';

const fs = require('fs');
const path = require('path');

@Injectable()
export class GamesService {
  constructor() {}

  getList(): any[] {
    const games: any[] = [];
    const folderPath = __dirname + '/../Data';

    const folders = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const folder of folders) {
      const gamePath = folderPath + '/' + folder + '/Game';
      const game = require(gamePath).default;
      games.push(game);
    }

    return games;
  }
}
