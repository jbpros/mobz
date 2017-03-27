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

type alias Model =
  { email : String
  , ready : Bool
  , status : Status
  , statusMessage : String
  }


init : ( Model, Cmd msg )
init =
  ( Model "" False Active "LOL", Cmd.none)


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

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Email email ->
      ({ model | email = email }, Cmd.none)

    StatusMessage statusMessage ->
      ({ model | statusMessage = statusMessage }, Cmd.none)

    Login ->
      ({ model | ready = True }, Cmd.none) -- TODO: tell backend

    SetInactive ->
      ({ model | status = Inactive }, Cmd.none) -- TODO: tell backend

    SetActive ->
      ({ model | status = Active }, Cmd.none) -- TODO: tell backend

    SetStatusMessage ->
      (model, Cmd.none) -- TODO: tell backend


-- VIEW


view : Model -> Html Msg
view model =
  div [ class "block border circle border-darken"  ]
    [ viewLoginForm model
    , viewApp model
    ]


viewLoginForm : Model -> Html Msg
viewLoginForm model =
  if not model.ready then
    Html.form [ onSubmit Login ]
      [ input [ type_ "email", placeholder "Email", onInput Email, value model.email ] []
      , input [ type_ "submit", value "Go" ] []
      ]
  else
    text ""

viewStatusMessageForm : Model -> Html Msg
viewStatusMessageForm model =
  Html.form [ onSubmit SetStatusMessage ]
    [ input [ type_ "text", placeholder "Your status", onInput StatusMessage, value model.statusMessage ] []
    , input [ type_ "submit", value "Set status message" ] []
    ]

viewApp : Model -> Html Msg
viewApp model =
  let
    (status, toggleStatus, toggleLabel) =
      case model.status of
        Active ->
          ("active", SetInactive, "Stop paying attention")

        Inactive ->
          ("inactive", SetActive, "Pay attention")
  in
    if model.ready then
      div []
        [ h1 []
          [ text "Welcome to mobz, "
          , text model.email
          , text "!"
          ]
        , viewGravatar model.email
        , p []
          [ text "You are currently "
          , text status
          , viewStatusMessage model.statusMessage
          ]
        , button [ onClick toggleStatus ]
          [ text toggleLabel ]
        , viewStatusMessageForm model
        ]
    else
      text ""

viewGravatar : String -> Html Msg
viewGravatar email =
  img [ src <| String.concat ["https://www.gravatar.com/avatar/", MD5.hex email] ] []

viewStatusMessage : String -> Html Msg
viewStatusMessage message =
  if String.length message > 0 then
    p []
      [ text message
      ]
  else
    text ""
