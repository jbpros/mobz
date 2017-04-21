module Msg.Main exposing (..)

import Msg.UserSettings as UserSettings
import Msg.Status as Status
import Msg.Server as Server


type Msg
    = MsgForUserSettings UserSettings.Msg
    | MsgForStatus Status.Msg
    | MsgFromServer Server.Msg
