module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit, onClick)
import MD5


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , subscriptions = \_ -> Sub.none
        , view = view
        }



-- MODEL


type alias UserSettings =
    { email : String
    , statusMessage : String
    , ready : Bool
    }


type alias Model =
    { userSettings : UserSettings
    , status : Status
    }


init : ( Model, Cmd msg )
init =
    ( Model (UserSettings "" "" False) Active, Cmd.none )



-- UPDATE


type Msg
    = Email String
    | StatusMessage String
    | Login
    | SetInactive
    | SetActive
    | SetStatusMessage


type Status
    = Active
    | Inactive


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( { model
        | userSettings = (updateUserSettings msg model.userSettings)
        , status = (updateStatus msg model.status)
      }
    , Cmd.none
    )


updateStatus : Msg -> Status -> Status
updateStatus msg status =
    case msg of
        Email email ->
            status

        StatusMessage statusMessage ->
            status

        Login ->
            status

        SetInactive ->
            -- TODO: tell backend
            Inactive

        SetActive ->
            -- TODO: tell backend
            Active

        SetStatusMessage ->
            -- TODO: tell backend
            status


updateUserSettings : Msg -> UserSettings -> UserSettings
updateUserSettings msg userSettings =
    case msg of
        Email email ->
            { userSettings | email = email }

        StatusMessage statusMessage ->
            { userSettings | statusMessage = statusMessage }

        Login ->
            { userSettings | ready = True }

        -- TODO: tell backend
        SetInactive ->
            userSettings

        -- TODO: tell backend
        SetActive ->
            userSettings

        -- TODO: tell backend
        SetStatusMessage ->
            userSettings



-- TODO: tell backend
-- VIEW


view : Model -> Html Msg
view model =
    div [ class "block border circle border-darken" ]
        [ viewLoginForm model.userSettings
        , viewApp model
        ]


viewLoginForm : UserSettings -> Html Msg
viewLoginForm userSettings =
    if not userSettings.ready then
        Html.form [ onSubmit Login ]
            [ input [ type_ "email", placeholder "Email", onInput Email, value userSettings.email ] []
            , input [ type_ "submit", value "Go" ] []
            ]
    else
        text ""


viewStatusMessageForm : UserSettings -> Html Msg
viewStatusMessageForm userSettings =
    Html.form [ onSubmit SetStatusMessage ]
        [ input
            [ type_ "text"
            , placeholder "Your status"
            , onInput StatusMessage
            , value userSettings.statusMessage
            ]
            []
        , input [ type_ "submit", value "Set status message" ] []
        ]


viewApp : Model -> Html Msg
viewApp model =
    let
        ( status, toggleStatus, toggleLabel ) =
            case model.status of
                Active ->
                    ( "active", SetInactive, "Stop paying attention" )

                Inactive ->
                    ( "inactive", SetActive, "Pay attention" )
    in
        if model.userSettings.ready then
            div []
                [ h1 []
                    [ text "Welcome to mobz, "
                    , text model.userSettings.email
                    , text "!"
                    ]
                , viewGravatar model.userSettings.email
                , p []
                    [ text "You are currently "
                    , text status
                    , viewStatusMessage model.userSettings.statusMessage
                    ]
                , button [ onClick toggleStatus ]
                    [ text toggleLabel ]
                , viewStatusMessageForm model.userSettings
                ]
        else
            text ""


viewGravatar : String -> Html Msg
viewGravatar email =
    img [ src <| String.concat [ "https://www.gravatar.com/avatar/", MD5.hex email ] ] []


viewStatusMessage : String -> Html Msg
viewStatusMessage message =
    if String.length message > 0 then
        p []
            [ text message
            ]
    else
        text ""
