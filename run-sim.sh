#!/usr/bin/env bash

TARGET_DEVICE="iPhone 14 Pro (simulator)"

# build the app before syncing ios files
npm run build

# sync the ios files
npx cap sync ios

# get the target id for the target device
TARGET_ID=$(npx cap run ios --list | grep "$TARGET_DEVICE" | awk '{print $NF}')

# run the app in the simulator
npx cap run ios --no-sync --target="$TARGET_ID"

exit 0
