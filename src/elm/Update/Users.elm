module Update.Users exposing (update)

import Json.Decode exposing (..)
import Model.Users exposing (Model)
import Msg.Main as Main exposing (..)
import Msg.Server as Users exposing (..)
import Debug exposing (..)


type alias DeviceId =
    String


type alias Email =
    String


type alias Timestamp =
    Int


type ServerMsg
    = Pinged Timestamp
    | UserEnteredRoom Timestamp DeviceId Email
    | Unknown Timestamp


update : Main.Msg -> Model -> Model
update msgFor users =
    case msgFor of
        MsgFromServer msg ->
            updateUsers msg users

        _ ->
            users


updateUsers : Users.Msg -> Model -> Model
updateUsers msg users =
    case msg of
        NewMessage json ->
            let
                serverMsg =
                    log "decoded" <| logJson json
            in
                users


logJson : String -> String
logJson json =
    case decodeString decodeMsgFromServer json of
        Ok (Pinged timestamp) ->
            String.concat [ "--pinged[", toString timestamp, "]--" ]

        Ok (UserEnteredRoom timestamp deviceId email) ->
            String.concat [ "--entered[", toString timestamp, "]:", email, " (", deviceId, ")--" ]

        Ok (Unknown timestamp) ->
            String.concat [ "--unknown[", toString timestamp, "]--" ]

        Err _ ->
            "--err--"


decodeMsgFromServer : Decoder ServerMsg
decodeMsgFromServer =
    field "type" string
        |> andThen decodeEvent


decodeEvent : String -> Decoder ServerMsg
decodeEvent eventType =
    case eventType of
        "pinged" ->
            map Pinged
                (at [ "timestamp" ] int)

        "user-entered-room" ->
            map3 UserEnteredRoom
                (at [ "timestamp" ] int)
                (at [ "payload", "deviceId" ] string)
                (at [ "payload", "email" ] string)

        _ ->
            map Unknown
                (at [ "timestamp" ] int)
