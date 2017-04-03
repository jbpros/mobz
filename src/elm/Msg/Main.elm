module Msg.Main exposing (..)

import Msg.UserSettings as UserSettings
import Msg.Status as Status


type Msg
    = MsgForUserSettings UserSettings.Msg
    | MsgForStatus Status.Msg
