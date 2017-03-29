module View.Gravatar exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import MD5
import Msg.Main exposing (..)


view : String -> Html Msg
view email =
    img
        [ src <| String.concat [ "https://www.gravatar.com/avatar/", MD5.hex email ] ]
        []
