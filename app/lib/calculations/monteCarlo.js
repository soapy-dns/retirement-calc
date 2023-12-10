var MONTE_CARLO = {},
  SELF = this

MONTE_CARLO.historicalData = []

MONTE_CARLO.inputs = {}
MONTE_CARLO.inputs.years = 30
MONTE_CARLO.inputs.savings = 100000
MONTE_CARLO.inputs.withdrawalRate = 0.045
MONTE_CARLO.inputs.stocks = 0.5
MONTE_CARLO.inputs.bonds = 0.3
MONTE_CARLO.inputs.cash = 0.2

MONTE_CARLO.TOTAL_TRIALS = 100000
MONTE_CARLO.MAX_YEARS = 50

SELF.addEventListener(
  "message",
  function (e) {
    "use strict"

    var data, total, error

    data = e.data

    switch (data.cmd) {
      case "load config":
        loadConfig()
        break
      case "simulate":
        MONTE_CARLO.inputs.years = parseInt(data.years)
        MONTE_CARLO.inputs.savings = parseInt(data.savings)
        MONTE_CARLO.inputs.withdrawalRate = parseFloat(data.withdrawalRate)
        MONTE_CARLO.inputs.stocks = parseFloat(data.stocks)
        MONTE_CARLO.inputs.bonds = parseFloat(data.bonds)
        MONTE_CARLO.inputs.cash = parseFloat(data.cash)
        if (isNaN(MONTE_CARLO.inputs.years) || MONTE_CARLO.inputs.years < 5 || MONTE_CARLO.inputs.years > 50) {
          error = "Invalid years"
        }
        if (isNaN(MONTE_CARLO.inputs.withdrawalRate) || MONTE_CARLO.inputs.withdrawalRate > 0.2) {
          error = "Invalid withdrawal rate"
        }
        if (isNaN(MONTE_CARLO.inputs.savings) || MONTE_CARLO.inputs.savings === 0) {
          error = "Invalid savings"
        }
        if (isNaN(MONTE_CARLO.inputs.stocks) || isNaN(MONTE_CARLO.inputs.bonds) || isNaN(MONTE_CARLO.inputs.cash)) {
          error = "Invalid allocation"
        } else {
          total = MONTE_CARLO.inputs.stocks + MONTE_CARLO.inputs.bonds + MONTE_CARLO.inputs.cash
          if (total > 0) {
            MONTE_CARLO.inputs.stocks /= total
            MONTE_CARLO.inputs.bonds /= total
            MONTE_CARLO.inputs.cash /= total
          } else {
            error = "Invalid allocation"
          }
        }
        if (error === undefined) {
          trace(
            "savings: " +
              MONTE_CARLO.inputs.savings +
              " years: " +
              MONTE_CARLO.inputs.years +
              " withdrawalRate: " +
              MONTE_CARLO.inputs.withdrawalRate +
              " stocks: " +
              MONTE_CARLO.inputs.stocks +
              " bonds: " +
              MONTE_CARLO.inputs.bonds +
              " cash: " +
              MONTE_CARLO.inputs.cash
          )
          simulateDecumulation()
        } else {
          SELF.postMessage({
            msg: "SIMULATION FAILED",
            error: error
          })
        }
        break
      case "stop":
        SELF.postMessage({
          msg: "WORKER STOPPED"
        })
        SELF.close()
        break
      /* default:
           SELF.postMessage({
                msg: "Unknown command: " + data.msg
            });*/
    }
  },
  false
)

function loadConfig() {
  "use strict"

  var xhr

  SELF.postMessage({
    msg: "LOAD CONFIG"
  })

  xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    var json, i, l

    if (xhr.readyState < 4) {
      return
    }
    if (xhr.status !== 200) {
      return
    }
    if (xhr.readyState === 4) {
      json = JSON.parse(xhr.responseText)

      for (i = 0, l = json.data.length; i < l; i++) {
        MONTE_CARLO.historicalData.push({
          year: parseInt(json.data[i].year),
          stocks: parseFloat(json.data[i].stocks),
          bonds: parseFloat(json.data[i].bonds),
          cash: parseFloat(json.data[i].cash),
          cpi: parseFloat(json.data[i].cpi)
        })
      }

      SELF.postMessage({
        msg: "CONFIG LOADED",
        years: MONTE_CARLO.historicalData.length
      })
    }
  }

  xhr.open("GET", "/web/angular/app/nesteggcalculator/data/config.json", true)
  xhr.send("")
}

function trace(msg) {
  "use strict"

  try {
    if (typeof console === "undefined") {
      return
    }
    console.log(msg)
  } catch (err) {
    // do nothing
  }
}

/*
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

SIMULATION model

-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
*/

function simulateDecumulation() {
  "use strict"

  var averageRateOfReturn,
    periods,
    trials,
    results,
    probabilities,
    withdrawal,
    initialWithdrawal,
    i,
    l,
    t,
    randomYear,
    balance,
    i975,
    i875,
    i750,
    i500,
    i250,
    i125,
    i025,
    arr,
    startTime,
    index

  startTime = new Date().getTime()
  averageRateOfReturn = 0
  periods = 0
  trials = []
  results = [
    [MONTE_CARLO.inputs.savings],
    [MONTE_CARLO.inputs.savings],
    [MONTE_CARLO.inputs.savings],
    [MONTE_CARLO.inputs.savings],
    [MONTE_CARLO.inputs.savings],
    [MONTE_CARLO.inputs.savings],
    [MONTE_CARLO.inputs.savings],
    [MONTE_CARLO.inputs.savings]
  ]
  probabilities = [1]
  initialWithdrawal = MONTE_CARLO.inputs.savings * MONTE_CARLO.inputs.withdrawalRate

  for (i = 1; i <= MONTE_CARLO.MAX_YEARS; i++) {
    trials[i] = []
    probabilities[i] = 0
  }

  for (t = 0; t < MONTE_CARLO.TOTAL_TRIALS; t++) {
    balance = MONTE_CARLO.inputs.savings
    withdrawal = initialWithdrawal
    for (i = 1; i <= MONTE_CARLO.MAX_YEARS; i++) {
      randomYear = Math.floor(Math.random() * MONTE_CARLO.historicalData.length)
      withdrawal *= 1 + MONTE_CARLO.historicalData[randomYear].cpi
      if (balance < withdrawal) {
        balance -= withdrawal
      } else {
        arr = 1
        periods++
        arr =
          MONTE_CARLO.historicalData[randomYear].stocks * MONTE_CARLO.inputs.stocks +
          MONTE_CARLO.historicalData[randomYear].bonds * MONTE_CARLO.inputs.bonds +
          MONTE_CARLO.historicalData[randomYear].cash * MONTE_CARLO.inputs.cash
        averageRateOfReturn += arr
        balance = (balance - withdrawal) * (1 + arr)
        probabilities[i]++
      }
      // add a small amount of randomness; otherwise, the quickSort will cause recursion errors
      trials[i].push(balance + Math.random() / 100)
    }
  }

  i975 = Math.round(MONTE_CARLO.TOTAL_TRIALS * 0.975)
  i875 = Math.round(MONTE_CARLO.TOTAL_TRIALS * 0.875)
  i750 = Math.round(MONTE_CARLO.TOTAL_TRIALS * 0.75)
  i500 = Math.round(MONTE_CARLO.TOTAL_TRIALS * 0.5)
  i250 = Math.round(MONTE_CARLO.TOTAL_TRIALS * 0.25)
  i125 = Math.round(MONTE_CARLO.TOTAL_TRIALS * 0.125)
  i025 = Math.round(MONTE_CARLO.TOTAL_TRIALS * 0.025)

  averageRateOfReturn /= periods

  for (i = 1; i <= MONTE_CARLO.MAX_YEARS; i++) {
    probabilities[i] = Math.max(0, Math.min(1, probabilities[i] / MONTE_CARLO.TOTAL_TRIALS))
    l = trials[i].length
    quickSort(trials[i], 0, l - 1, l)
    results[0].push(Math.round(trials[i][i975]))
    results[1].push(Math.round(trials[i][i875]))
    results[2].push(Math.round(trials[i][i750]))
    results[3].push(Math.round(trials[i][i500]))
    results[4].push(Math.round(trials[i][i250]))
    results[5].push(Math.round(trials[i][i125]))
    results[6].push(Math.round(trials[i][i025]))
  }

  index = Math.min(l - 1, Math.round(MONTE_CARLO.TOTAL_TRIALS * (1 - probabilities[MONTE_CARLO.inputs.years])))
  for (i = 1; i <= MONTE_CARLO.MAX_YEARS; i++) {
    results[7].push(Math.round(trials[i][index]))
  }

  SELF.postMessage({
    msg: "SIMULATION COMPLETE",
    results: results,
    probabilities: probabilities,
    averageRateOfReturn: averageRateOfReturn,
    simulationRetirementYears: MONTE_CARLO.inputs.years,
    elapsed: new Date().getTime() - startTime
  })
}

/*
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

Quicksort

-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
*/

function quickSort(arr, leftPos, rightPos, arrLength) {
  "use strict"

  var initialLeftPos, initialRightPos, direction, pivot

  initialLeftPos = leftPos
  initialRightPos = rightPos
  direction = true
  pivot = rightPos
  while (leftPos - rightPos < 0) {
    if (direction) {
      if (arr[pivot] < arr[leftPos]) {
        swap(arr, pivot, leftPos)
        pivot = leftPos
        rightPos--
        direction = !direction
      } else {
        leftPos++
      }
    } else {
      if (arr[pivot] <= arr[rightPos]) {
        rightPos--
      } else {
        swap(arr, pivot, rightPos)
        leftPos++
        pivot = rightPos
        direction = !direction
      }
    }
  }
  if (pivot - 1 > initialLeftPos) {
    quickSort(arr, initialLeftPos, pivot - 1, arrLength)
  }
  if (pivot + 1 < initialRightPos) {
    quickSort(arr, pivot + 1, initialRightPos, arrLength)
  }
}

function swap(arr, el1, el2) {
  "use strict"

  var temp = arr[el1]
  arr[el1] = arr[el2]
  arr[el2] = temp
}
