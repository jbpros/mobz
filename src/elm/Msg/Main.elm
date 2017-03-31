module Msg.Main exposing (..)

import Msg.UserSettings as UserSettings


type Msg
    = MsgForUserSettings UserSettings.Msg
    | SetInactive
    | SetActive
