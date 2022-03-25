import React ,{ useContext } from "react";
import { Button } from "../Button/Button";
import { Bug, TipsOne, Harm } from "@icon-park/react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import "./Toast.css";
export function Toast({
  content,
  type,
  toastOkayEvent,
  okayContent,
  toastCancelEvent,
  cancelContent,
  isInOneLine
}) {
  const { ThemeData } = useContext(ThemeContext);
  return (
    <section className="Toast page">
      <div
        className="hasShadow"
        style={{
          backgroundColor: ThemeData.depthColor,
          width: "90%",
          padding: "20px",
          maxWidth: "500px",
          minHeight: "300px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <>
          {type === "error" && (
            <>
              <Bug
                theme="two-tone"
                size="40"
                fill={[ThemeData.depthColorTwo, ThemeData.errorColor]}
              />
            </>
          )}
          {type === "warning" && <>Warning Icon</>}
          {type === "danger" && (
            <>
              <Harm
                theme="two-tone"
                size="40"
                fill={[ThemeData.depthColorTwo, ThemeData.errorColor]}
              />
            </>
          )}
          {type === "message" && (
            <>
              <TipsOne
                theme="two-tone"
                size="40"
                fill={[ThemeData.depthColorTwo, "#2F88FF"]}
              />
            </>
          )}
          <p style={{ textAlign: "justify", color: ThemeData.primaryColorTwo }}>
            {content}
          </p>
        </>
        <div
          style={{
            width: "100%",
            display: isInOneLine ? "flex" : "block",
            justifyContent: isInOneLine ? "space-around" : "unset",
            alignItems: isInOneLine ? "center" : "unset"
          }}
        >
          {cancelContent && (
            <Button
              width={isInOneLine ? "40%" : "100%"}
              height="40px"
              content={cancelContent}
              event={toastCancelEvent}
              className="secondaryButton"
            />
          )}
          {okayContent && (
            <Button
              content={okayContent}
              width={isInOneLine ? "40%" : "100%"}
              height="40px"
              event={toastOkayEvent}
              className="primaryButton"
            />
          )}
        </div>
      </div>
    </section>
  );
}
