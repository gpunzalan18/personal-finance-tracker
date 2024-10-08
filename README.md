# Personal Finance Tracker

[Personal Finance Tracker (PFT)](https://eager-bhabha-3972a8.netlify.app/) is a simple tool to understand income and expenses and provide a holistic picture of one's finances.

Keep in mind that PFT does not store any of the information provided. Users will have to provide data again every time they visit PFT. Alternatively, there is an option to use demo data so that users can explore the tool.

## Usage

### Bank Account Transactions

- Must be a valid .csv file with the specified format (see below). Make sure to include headers.
- Every transaction must have a date, a description, and an amount. Amounts that are greater than zero are income and those that are less are expenses. Any additional headers will be ignored.

```
Date,Description,Amount
01/04/2024,"Online Banking transfer Confirmation# 123456789","1285.00"
01/04/2024,"WHOLEFDS PTL 1 01/02 PURCHASE,"-72.35"
01/05/2024,"APPLE PURCHASE #7d234w",-72.35"
01/04/2024,"CAR INSURANACE AUTO-PAY","-110.34"
02/02/2024,"transfer to saving #1234","-500.00"
02/10/2024,"Online Banking transfer #098712344567","1800.00"
02/14/2024,"AMAZON PRIME 1 PURCHASE PORTLAND ME","-391.00"
02/21/2024,"POPEYE 1000 PURCHASE 123-876-123","-25.77"
02/22/2024,"ONLINE ORDER PURCHASE 123-000000","-55.14"
02/29/2024,"TARGET 1 01/12 PURCHASE SPRINGFIELD","-940.00"
02/30/2024,"APT RENT tranfer #1209385692","-800.00"
03/09/2024,"transfer to saving #1234","-100.00"
03/10/2024,"Online Banking transfer #098712344567","1200.00"
03/14/2024,"TARGET 1 PURCHASE PORTLAND ME","-251.00"
03/21/2024,"DOMINO'S 3001 PURCHASE 123-876-123","-25.77"
03/22/2024,"ONLINE ORDER PURCHASE 999-000000","-181.14"
03/29/2024,"TARGET 1 01/12 PURCHASE SPRINGFIELD","-166.00"
03/30/2024,"APT RENT tranfer #1209385692","-800.00"
04/01/2024,"PHONE BILL PFA 1 04/01","-61.48"
04/05/2024,"AMAZON #6138 PURCHASE","-263.70"
04/12/2024,"Online Banking transfer Confirmation# 0987654321","1500.00"
04/16/2024,"WHOLEFDS MARKET 04/16 PURCHASE","-133.53"
04/18/2024,"DONUT SHOP 04/18 PURCHASE 207-7475063 ME","-24.38"
```

### Category List and Keywords

- Must be a valid .csv file with the specified format (see below). Do not include headers.
- PFT will use this to categorize expenses into different buckets.
- Notice that the first value for every row is a category followed by its keywords.

```
bills,bellport,rent,phone,bill,at&t,geico,car,aaa
grocery,hannaford,market,mart,super,giant,king,target,wholefds
entertainment,disney,hulu,spotify,roku,amazon,amzn,netflix,prime,movie,fandango
restaurant,mcdonald,popeyes,donut,sweet,subway,resturant,king,domino,tea,tacos,panda,poke,ihop
```

## Technology Stack

### Built With

- [chart.js v2.7.0](https://www.npmjs.com/package/chart.js)
- [ng2-charts](https://www.npmjs.com/package/ng2-charts)
- [Angular Material](https://material.angular.io/)
- [rxjs](https://www.npmjs.com/package/rxjs)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

### Deployed With

- [Netlify](https://www.netlify.com/)

## Contributors

- Grace Punzalan (Author)

## License

- [MIT License](https://opensource.org/licenses/MIT)
