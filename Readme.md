# Vending machine

This application implements a greedy algorithm  to solve the Change-making problem.

### Paths
Get optimal change for euro:  http://localhost:3000/euro/optimalchange?euro=2

Get change for euro: http://localhost:3000/euro/change?euro=2

Feel vending machine: http://localhost:3000/test/fill-machine

Check balance: http://localhost:3000/test/balance


### Installing

!!!!!This app uses a docker, so you need to install it before you start!!!!!

Install npm packages
```
$ npm install 
```

### Run app

```
$ docker-compose up
```
Open http://localhost:3000

## Running the tests

```
docker-compose -f docker-compose-test.yml up
```

