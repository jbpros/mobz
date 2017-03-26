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
  , ready: Bool
  , status: Status
  }


init : ( Model, Cmd msg )
init =
  ( Model "" False Active, Cmd.none)


-- UPDATE


type Msg
    = Email String
    | Login
    | SetInactive
    | SetActive

type Status
    = Active
    | Inactive

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Email email ->
      ({ model | email = email }, Cmd.none)

    Login ->
      ({ model | ready = True }, Cmd.none)

    SetInactive ->
      ({ model | status = Inactive }, Cmd.none)

    SetActive ->
      ({ model | status = Active }, Cmd.none)


-- VIEW


view : Model -> Html Msg
view model =
  Html.form [ onSubmit Login ]
    [ viewLoginForm model
    , viewApp model
    ]

viewLoginForm : Model -> Html Msg
viewLoginForm model =
  if not model.ready then
    div []
      [ input [ type_ "email", placeholder "Email", onInput Email ] []
      , input [ type_ "submit", value "Yo" ] []
      ]
  else
    text ""

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
          ]
        , button [ onClick toggleStatus ]
          [ text toggleLabel ]
        ]
    else
      text ""

viewGravatar : String -> Html Msg
viewGravatar email =
  img [ src <| String.concat ["https://www.gravatar.com/avatar/", MD5.hex email] ] []


-- https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200
