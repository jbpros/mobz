module View.StatusMessage exposing (view)

import Html exposing (..)
import Msg.Main exposing (..)


view : String -> Html Msg
view message =
    if String.length message > 0 then
        p []
            [ text message
            ]
    else
        text ""
