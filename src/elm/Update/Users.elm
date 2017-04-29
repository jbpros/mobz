module Update.Users exposing (update)

import Json.Decode exposing (..)
import Debug exposing (..)
import Model.Users as Users
import Model.User as User
import Model.Status as Status
import Msg.Main as MainMsg
import Msg.Server as ServerMsg


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


update : MainMsg.Msg -> Users.Model -> Users.Model
update msgFor users =
    case msgFor of
        MainMsg.MsgFromServer msg ->
            updateUsers msg users

        _ ->
            users


updateUsers : ServerMsg.Msg -> Users.Model -> Users.Model
updateUsers msg users =
    case msg of
        ServerMsg.NewMessage json ->
            let
                serverMsg =
                    decodeString decodeMsgFromServer json

                a =
                    log "decoded" <| logJson serverMsg
            in
                case serverMsg of
                    Ok (UserEnteredRoom timestamp deviceId email) ->
                        List.append users [ User.Model email Status.Active ]

                    _ ->
                        users


logJson : Result String ServerMsg -> String
logJson serverMsg =
    case serverMsg of
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
