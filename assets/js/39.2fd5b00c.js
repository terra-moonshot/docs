(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{430:function(t,e,n){"use strict";n.r(e);var s=n(5),a=Object(s.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"evidence"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#evidence"}},[t._v("#")]),t._v(" Evidence")]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),n("p",[t._v("Terra's evidence module inherits from Cosmos SDK's "),n("a",{attrs:{href:"https://docs.cosmos.network/master/modules/evidence/",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("evidence")]),n("OutboundLink")],1),t._v(" module. This document is a stub, and covers mainly important Terra-specific notes about how it is used.")])]),t._v(" "),n("p",[t._v("The evidence module allows arbitrary evidence of misbehavior, such as equivocation and counterfactual signing, to be submitted and handled.")]),t._v(" "),n("p",[t._v("Typically, standard evidence handling expects the underlying consensus engine, Tendermint, to automatically submit evidence when it is discovered by allowing clients and foreign chains to submit more complex evidence directly. The evidence module operates differently.")]),t._v(" "),n("p",[t._v("All concrete evidence types must implement the "),n("code",[t._v("Evidence")]),t._v(" interface contract. First, submitted "),n("code",[t._v("Evidence")]),t._v(" is routed through the evidence module's "),n("code",[t._v("Router")]),t._v(", where it attempts to find a corresponding registered "),n("code",[t._v("Handler")]),t._v(" for that specific "),n("code",[t._v("Evidence")]),t._v(" type. Each "),n("code",[t._v("Evidence")]),t._v(" type must have a "),n("code",[t._v("Handler")]),t._v(" registered with the evidence module's keeper for it to be successfully routed and executed.")]),t._v(" "),n("p",[t._v("Each corresponding handler must also fulfill the "),n("code",[t._v("Handler")]),t._v(" interface contract. The "),n("code",[t._v("Handler")]),t._v(" for a given "),n("code",[t._v("Evidence")]),t._v(" type can perform any arbitrary state transitions such as slashing, jailing, and tombstoning.")]),t._v(" "),n("h2",{attrs:{id:"concepts"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#concepts"}},[t._v("#")]),t._v(" Concepts")]),t._v(" "),n("h3",{attrs:{id:"evidence-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#evidence-2"}},[t._v("#")]),t._v(" Evidence")]),t._v(" "),n("p",[t._v("Any concrete type of evidence submitted to the  module must fulfill the following "),n("code",[t._v("Evidence")]),t._v(" contract. Not all concrete types of evidence will fulfill this contract in the same way, and some data might be entirely irrelevant to certain types of evidence. An additional "),n("code",[t._v("ValidatorEvidence")]),t._v(", which extends "),n("code",[t._v("Evidence")]),t._v(", has also been created to define a contract for evidence against malicious validators.")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("// Evidence defines the contract which concrete evidence types of misbehavior\n// must implement.\ntype Evidence interface {\n\tproto.Message\n\n\tRoute() string\n\tType() string\n\tString() string\n\tHash() tmbytes.HexBytes\n\tValidateBasic() error\n\n\t// Height at which the infraction occurred\n\tGetHeight() int64\n}\n\n// ValidatorEvidence extends Evidence interface to define contract\n// for evidence against malicious validators\ntype ValidatorEvidence interface {\n\tEvidence\n\n\t// The consensus address of the malicious validator at time of infraction\n\tGetConsensusAddress() sdk.ConsAddress\n\n\t// The total power of the malicious validator at time of infraction\n\tGetValidatorPower() int64\n\n\t// The total validator set power at time of infraction\n\tGetTotalPower() int64\n}\n")])])]),n("h3",{attrs:{id:"registration-and-handling"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#registration-and-handling"}},[t._v("#")]),t._v(" Registration and handling")]),t._v(" "),n("p",[t._v("First, the evidence module must know about all the types of evidence it is expected to handle. Register the "),n("code",[t._v("Route")]),t._v(" method in the "),n("code",[t._v("Evidence")]),t._v(" contract with a "),n("code",[t._v("Router")]),t._v(" as defined below. The "),n("code",[t._v("Router")]),t._v(" accepts "),n("code",[t._v("Evidence")]),t._v(" and attempts to find the corresponding "),n("code",[t._v("Handler")]),t._v(" for the "),n("code",[t._v("Evidence")]),t._v(" via the "),n("code",[t._v("Route")]),t._v(" method.")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("type Router interface {\n  AddRoute(r string, h Handler) Router\n  HasRoute(r string) bool\n  GetRoute(path string) Handler\n  Seal()\n  Sealed() bool\n}\n")])])]),n("p",[t._v("As defined below, the "),n("code",[t._v("Handler")]),t._v(" is responsible for executing the entirety of the business logic for handling "),n("code",[t._v("Evidence")]),t._v(". Doing so typically includes validating the evidence, both stateless checks via "),n("code",[t._v("ValidateBasic")]),t._v(" and stateful checks via any keepers provided to the "),n("code",[t._v("Handler")]),t._v(". Additionally, the "),n("code",[t._v("Handler")]),t._v(" may also perform capabilities, such as slashing and jailing a validator. All "),n("code",[t._v("Evidence")]),t._v(" handled by the "),n("code",[t._v("Handler")]),t._v(" must be persisted.")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("// Handler defines an agnostic Evidence handler. The handler is responsible\n// for executing all corresponding business logic necessary for verifying the\n// evidence as valid. In addition, the Handler may execute any necessary\n// slashing and potential jailing.\ntype Handler func(sdk.Context, Evidence) error\n")])])]),n("h3",{attrs:{id:"state"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#state"}},[t._v("#")]),t._v(" State")]),t._v(" "),n("p",[t._v("The evidence module only stores valid submitted "),n("code",[t._v("Evidence")]),t._v(" in state. The evidence state is also stored and exported in the evidence module's "),n("code",[t._v("GenesisState")]),t._v(".")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("// GenesisState defines the evidence module's genesis state.\nmessage GenesisState {\n  // evidence defines all the evidence at genesis.\n  repeated google.protobuf.Any evidence = 1;\n}\n")])])]),n("h2",{attrs:{id:"messages"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#messages"}},[t._v("#")]),t._v(" Messages")]),t._v(" "),n("h3",{attrs:{id:"msgsubmitevidence"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#msgsubmitevidence"}},[t._v("#")]),t._v(" MsgSubmitEvidence")]),t._v(" "),n("p",[t._v("Evidence is submitted through a "),n("code",[t._v("MsgSubmitEvidence")]),t._v(" message:")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("// MsgSubmitEvidence represents a message that supports submitting arbitrary\n// Evidence of misbehavior such as equivocation or counterfactual signing.\nmessage MsgSubmitEvidence {\n  string              submitter = 1;\n  google.protobuf.Any evidence  = 2;\n}\n")])])]),n("p",[t._v("The "),n("code",[t._v("Evidence")]),t._v(" of a "),n("code",[t._v("MsgSubmitEvidence")]),t._v(" message must have a corresponding "),n("code",[t._v("Handler")]),t._v(" registered with the evidence module's "),n("code",[t._v("Router")]),t._v(" to be processed and routed correctly.")]),t._v(" "),n("p",[t._v("Given the "),n("code",[t._v("Evidence")]),t._v(" is registered with a corresponding "),n("code",[t._v("Handler")]),t._v(", it is processed as follows:")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("func SubmitEvidence(ctx Context, evidence Evidence) error {\n  if _, ok := GetEvidence(ctx, evidence.Hash()); ok {\n    return sdkerrors.Wrap(types.ErrEvidenceExists, evidence.Hash().String())\n  }\n  if !router.HasRoute(evidence.Route()) {\n    return sdkerrors.Wrap(types.ErrNoEvidenceHandlerExists, evidence.Route())\n  }\n\n  handler := router.GetRoute(evidence.Route())\n  if err := handler(ctx, evidence); err != nil {\n    return sdkerrors.Wrap(types.ErrInvalidEvidence, err.Error())\n  }\n\n  ctx.EventManager().EmitEvent(\n\t\tsdk.NewEvent(\n\t\t\ttypes.EventTypeSubmitEvidence,\n\t\t\tsdk.NewAttribute(types.AttributeKeyEvidenceHash, evidence.Hash().String()),\n\t\t),\n\t)\n\n  SetEvidence(ctx, evidence)\n  return nil\n}\n")])])]),n("p",[t._v("Valid submitted "),n("code",[t._v("Evidence")]),t._v(" of the same type must not already exist. The "),n("code",[t._v("Evidence")]),t._v(" is routed to the "),n("code",[t._v("Handler")]),t._v(" and executed. If no error in handling the Evidence occurs, an event is emitted, and it is persisted to state.")]),t._v(" "),n("h3",{attrs:{id:"events"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),n("p",[t._v("The evidence module emits the following handler events:")]),t._v(" "),n("h4",{attrs:{id:"msgsubmitevidence-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#msgsubmitevidence-2"}},[t._v("#")]),t._v(" MsgSubmitEvidence")]),t._v(" "),n("table",[n("thead",[n("tr",[n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Attribute Key")]),t._v(" "),n("th",[t._v("Attribute Value")])])]),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("submit_evidence")]),t._v(" "),n("td",[t._v("evidence_hash")]),t._v(" "),n("td",[t._v("{evidenceHash}")])]),t._v(" "),n("tr",[n("td",[t._v("message")]),t._v(" "),n("td",[t._v("module")]),t._v(" "),n("td",[t._v("evidence")])]),t._v(" "),n("tr",[n("td",[t._v("message")]),t._v(" "),n("td",[t._v("sender")]),t._v(" "),n("td",[t._v("{senderAddress}")])]),t._v(" "),n("tr",[n("td",[t._v("message")]),t._v(" "),n("td",[t._v("action")]),t._v(" "),n("td",[t._v("submit_evidence")])])])]),t._v(" "),n("h3",{attrs:{id:"beginblock"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#beginblock"}},[t._v("#")]),t._v(" BeginBlock")]),t._v(" "),n("h4",{attrs:{id:"evidence-handling"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#evidence-handling"}},[t._v("#")]),t._v(" Evidence handling")]),t._v(" "),n("p",[t._v("Tendermint blocks can include\n"),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/spec/blockchain/blockchain.md#evidence",target:"_blank",rel:"noopener noreferrer"}},[t._v("Evidence"),n("OutboundLink")],1),t._v(" that indicates whether a validator acted maliciously. The relevant information is forwarded to the application as ABCI Evidence in "),n("code",[t._v("abci.RequestBeginBlock")]),t._v(" so that the validator can be punished accordingly.")]),t._v(" "),n("h4",{attrs:{id:"equivocation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#equivocation"}},[t._v("#")]),t._v(" Equivocation")]),t._v(" "),n("p",[t._v("Currently, the SDK handles two types of evidence inside the ABCI "),n("code",[t._v("BeginBlock")]),t._v(":")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("DuplicateVoteEvidence")]),t._v(",")]),t._v(" "),n("li",[n("code",[t._v("LightClientAttackEvidence")]),t._v(".")])]),t._v(" "),n("p",[t._v("The evidence module handles these two evidence types the same way. First, the SDK converts the Tendermint concrete evidence type to a SDK "),n("code",[t._v("Evidence")]),t._v(" interface by using "),n("code",[t._v("Equivocation")]),t._v(" as the concrete type.")]),t._v(" "),n("div",{staticClass:"language-proto extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("// Equivocation implements the Evidence interface.\nmessage Equivocation {\n  int64                     height            = 1;\n  google.protobuf.Timestamp time              = 2;\n  int64                     power             = 3;\n  string                    consensus_address = 4;\n}\n")])])]),n("p",[t._v("For an "),n("code",[t._v("Equivocation")]),t._v(" submitted in "),n("code",[t._v("block")]),t._v(" to be valid, it must meet the following requirement:")]),t._v(" "),n("p",[n("code",[t._v("Evidence.Timestamp >= block.Timestamp - MaxEvidenceAge")])]),t._v(" "),n("p",[t._v("where:")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("Evidence.Timestamp")]),t._v(" is the timestamp in the block at height "),n("code",[t._v("Evidence.Height")]),t._v(".")]),t._v(" "),n("li",[n("code",[t._v("block.Timestamp")]),t._v(" is the current block timestamp.")])]),t._v(" "),n("p",[t._v("If valid "),n("code",[t._v("Equivocation")]),t._v(" evidence is included in a block, the validator's stake is\nreduced by "),n("code",[t._v("SlashFractionDoubleSign")]),t._v(", as defined by the "),n("RouterLink",{attrs:{to:"/Reference/Terra-core/Module-specifications/spec-slashing.html"}},[t._v("slashing module")]),t._v(". The reduction is implemented at the point when the infraction occurred instead of when the evidence was discovered.\nThe stake that contributed to the infraction is slashed, even if it has been redelegated or started unbonding.")],1),t._v(" "),n("p",[t._v("Additionally, the validator is permanently jailed and tombstoned so that the validator cannot re-enter the validator set again.")]),t._v(" "),n("details",{staticClass:"custom-block details"},[n("summary",[t._v("`Equivocation` evidence handling code")]),t._v(" "),n("div",{staticClass:"language-go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("k Keeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("HandleEquivocationEvidence")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx sdk"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" evidence "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("types"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Equivocation"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tlogger "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Logger")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tconsAddr "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" evidence"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetConsensusAddress")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("slashingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetPubkey")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bytes")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Ignore evidence that cannot be handled.")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// NOTE: We used to panic with:")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// `panic(fmt.Sprintf("Validator consensus-address %v not found", consAddr))`,')]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// but this couples the expectations of the app to both Tendermint and")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// the simulator.  Both are expected to provide the full range of")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// allowable but none of the disallowed evidence types.  Instead of")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// getting this coordination right, it is easier to relax the")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// constraints and ignore evidence that cannot be handled.")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// calculate the age of the evidence")]),t._v("\n\tinfractionHeight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" evidence"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetHeight")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tinfractionTime "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" evidence"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetTime")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tageDuration "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("BlockHeader")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Time"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Sub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("infractionTime"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tageBlocks "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("BlockHeader")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Height "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" infractionHeight\n\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Reject evidence if the double-sign is too old. Evidence is considered stale")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// if the difference in time and number of blocks is greater than the allowed")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// parameters defined.")]),t._v("\n\tcp "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ConsensusParams")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" cp "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" cp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Evidence "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" ageDuration "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" cp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Evidence"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MaxAgeDuration "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" ageBlocks "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" cp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Evidence"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MaxAgeNumBlocks "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tlogger"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Info")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ignored equivocation; evidence too old"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"validator"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"infraction_height"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" infractionHeight"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"max_age_num_blocks"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" cp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Evidence"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MaxAgeNumBlocks"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"infraction_time"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" infractionTime"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"max_age_duration"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" cp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Evidence"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MaxAgeDuration"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\tvalidator "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("stakingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ValidatorByConsAddr")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" validator "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" validator"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("IsUnbonded")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Defensive: Simulation doesn't take unbonding periods into account, and")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Tendermint might break this assumption at some point.")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" ok "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("slashingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("HasValidatorSigningInfo")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("ok "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("panic")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fmt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Sprintf")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"expected signing info for validator %s but not found"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ignore if the validator is already tombstoned")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("slashingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("IsTombstoned")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tlogger"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Info")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ignored equivocation; validator already tombstoned"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"validator"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"infraction_height"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" infractionHeight"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"infraction_time"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" infractionTime"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\tlogger"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Info")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"confirmed equivocation"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"validator"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"infraction_height"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" infractionHeight"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"infraction_time"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" infractionTime"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// We need to retrieve the stake distribution which signed the block, so we")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// subtract ValidatorUpdateDelay from the evidence height.")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// Note, that this *can* result in a negative "distributionHeight", up to')]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -ValidatorUpdateDelay, i.e. at the end of the")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// pre-genesis block (none) = at the beginning of the genesis block.")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// That's fine since this is just used to filter unbonding delegations & redelegations.")]),t._v("\n\tdistributionHeight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" infractionHeight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" sdk"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ValidatorUpdateDelay\n\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Slash validator. The `power` is the int64 power of the validator as provided")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// to/by Tendermint. This value is validator.Tokens as sent to Tendermint via")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ABCI, and now received as evidence. The fraction is passed in to separately")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// to slash unbonding and rebonding delegations.")]),t._v("\n\tk"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("slashingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Slash")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\tctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\tconsAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\tk"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("slashingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("SlashFractionDoubleSign")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\tevidence"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetValidatorPower")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" distributionHeight"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Jail the validator if not already jailed. This will begin unbonding the")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// validator if not already unbonding (tombstoned).")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("validator"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("IsJailed")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tk"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("slashingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Jail")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\tk"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("slashingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("JailUntil")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" types"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DoubleSignJailEndTime"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tk"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("slashingKeeper"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Tombstone")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consAddr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("p",[t._v("The slashing, jailing, and tombstoning calls are delegated through the slashing module, which emits informative events and finally delegates calls to the staking module. For more information about slashing and jailing, see "),n("RouterLink",{attrs:{to:"/Reference/Terra-core/Module-specifications/spec-staking.html#transitions"}},[t._v("transitions")]),t._v(".")],1)])}),[],!1,null,null,null);e.default=a.exports}}]);