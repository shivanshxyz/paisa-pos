# paisa-pos
The most practical POS system for accepting crypto payments. no need to install any app

![Paisa (3)](https://github.com/shivanshxyz/paisa-pos/assets/24312840/7034e3c6-db9c-45d3-bc57-defa40916a76)


## Problem Statement
- Modern wallet app transaction procedure is very alien for people who barely know how to even use a phone
- This is a huge roadblock when is comes to mass adoption of crypto payments among small business owners
- Present solution has way more friction when compared to using cash


## Solution
- An easy to use POS system where there is no need to even install an app. Everyone can start accepting payments within seconds
- I implemented way to get transaction alerts without even opening your phone so that you can shift your focus on stuff that truly matters
- The system is so effortless that everyone can use it


## How it works
The system is divided into two parts
|                                               **Web based payment kiosk**                                               |                                               **Low cost payment alert soundbox**                                              |
|:-----------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|
|                 No nonsense payment requests through an intuitive interface. Just get started right away                | A smart speaker that makes automated sound alerts whenever the vendor receives any amount in their wallet using text to speech |
| Just enter your address or .eth name and the amount you want to receive and the kiosk will generate a custom amount QR code |                                 Uses very low cost hardware microcontrollers like Raspberry pi                                 |
|             The customer uses the QR code scanner from their phone and can pay through their mobile wallet app            |                      The smart speaker uses Quicknode’s Quickalerts service to monitor wallet transactions                     |
|                                                                                                                         | No need to check your wallet every after every transaction so that you can focus on stuff that truly matters                   |

![Paisa (5)](https://github.com/shivanshxyz/paisa-pos/assets/24312840/069e4c95-cbd5-4993-bfaf-dc12c7cd2587)

![Paisa (4)](https://github.com/shivanshxyz/paisa-pos/assets/24312840/f83eebc6-106a-489a-82a2-c5f1063a5b73)



## Tech Stack
- POS app
  - react

- Smart speaker
  - Quicknode-sdk
  - Python ttsx3 library
  - Raspberry pi
