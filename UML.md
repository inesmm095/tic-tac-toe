## Tic Tac Toe App – UML Overview

This document describes the main structure and flows of the tic-tac-toe application using UML-style diagrams (Mermaid).

### Component & Logic Structure (Class Diagram)

```mermaid
classDiagram
direction LR

class Home {
  - step : Step
  - gameMode : GameMode
  - playerX : string
  - playerO : string
  - singlePlayerName : string
  - board : CellValue[9]
  - currentPlayer : PlayerMark
  - winner : PlayerMark | "Draw" | null
  - humanMark : PlayerMark | null
  - computerMark : PlayerMark | null
  + startGameFromSetup()
  + handleCellClick(index)
  + handleBackToMode()
  + handleBackToNames()
}

class StepIndicator {
  + step : Step
}

class StepMode {
  + gameMode : GameMode
  + onSelectMode(mode)
  + onContinue()
}

class StepNames {
  + gameMode : GameMode
  + playerX : string
  + playerO : string
  + singlePlayerName : string
  + onChangePlayerX(value)
  + onChangePlayerO(value)
  + onChangeSinglePlayerName(value)
  + onBackToMode()
  + onStartGame()
}

class GameStep {
  + gameMode : GameMode
  + board : CellValue[9]
  + currentPlayer : PlayerMark
  + winner : PlayerMark | "Draw" | null
  + onCellClick(index)
  + onPlayAgain()
  + onChangeSetup()
}

class TicTacToeLogic {
  + calculateWinner(cells) : PlayerMark?
  + evaluateBoard(cells) : { winner, isDraw }
  + makeRandomMove(cells, mark) : { board, winner, isDraw }
}

Home --> StepIndicator : renders
Home --> StepMode : renders (step 1)
Home --> StepNames : renders (step 2)
Home --> GameStep : renders (step 3)
Home ..> TicTacToeLogic : uses
```

### One-Player Game Start (Sequence Diagram)

```mermaid
sequenceDiagram
autonumber
actor User
participant StepMode
participant StepNames
participant Home
participant Logic as TicTacToeLogic
participant GameStep

User->>StepMode: choose "One player"
StepMode->>Home: onSelectMode(\"one\")
User->>StepMode: click Continue
StepMode->>Home: setStep(2)

User->>StepNames: type name
User->>StepNames: blur input
StepNames->>Home: onStartGame()

Home->>Home: validate gameMode & name
Home->>Home: randomize human/computer marks
Home->>Home: assign playerX / playerO
Home->>Logic: makeRandomMove(initialBoard, compMark) (if computer is X)
Logic-->>Home: { board, winner?, isDraw }
Home->>Home: update board/currentPlayer/winner
Home->>Home: setStep(3)
Home->>GameStep: render board + status
```

### Player Move vs Computer (Sequence Diagram)

```mermaid
sequenceDiagram
autonumber
actor User as HumanPlayer
participant GameStep
participant Home
participant Logic as TicTacToeLogic

HumanPlayer->>GameStep: click cell
GameStep->>Home: onCellClick(index)
Home->>Home: ensure step === 3 && human turn
Home->>Home: place humanMark on board[index]
Home->>Logic: evaluateBoard(board)
Logic-->>Home: { winner?, isDraw }
alt human wins or draw
  Home->>Home: set winner / draw
  Home-->>GameStep: render final board & status
else continue
  Home->>Logic: makeRandomMove(board, computerMark)
  Logic-->>Home: { board, winner?, isDraw }
  Home->>Home: update board
  alt computer wins or draw
    Home->>Home: set winner / draw
  else
    Home->>Home: set currentPlayer = humanMark
  end
  Home-->>GameStep: render updated board & status
end
```

You can view these diagrams directly in tools that support Mermaid (such as GitHub, many markdown preview plugins, or online Mermaid editors).

