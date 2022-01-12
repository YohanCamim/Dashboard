import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAbout(req: any): object {
    return {
      customer: {
        host: req.ip
      },
      server: {
        current_time: new Date().getTime(),
        services: [{
          name: "Weather",
          widgets: [{
            name: "City Temp",
            description: "Temperature of a city",
            params: [{
              name: "city",
              type: "string"
            }]
          }]
        },
        {
          name: "Currency",
          widgets: [{
            name: "Difference between",
            description: "Difference between crypto and currency",
            params: [{
              name: "First Currency",
              type: "string"
            },
            {
              name: "Second Currency",
              type: "string"
            }]
          }]
        }, {
          name: "Love",
          widgets: [{
            name: "Love Calculator",
            description: "Display the percentage of love between 2 names",
            params: [{
              name: "First Name",
              type: "string"
            },
            {
              name: "Second Name",
              type: "string"
            }]
          }]
        },{
          name: "Covid19",
          widgets: [{
            name: "Global Covid 19 stats ",
            description: "Display main stats for a specific country",
            params: [{
              name: "city",
              type: "string"
            }]
          }]
        },
      ]
      }
    }
  }
}
