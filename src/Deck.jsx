import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Layers, Cpu, Workflow, Users, Database, Shield, Zap, BarChart2, RefreshCw, AlertTriangle, Package, Clock, Target, TrendingUp } from "lucide-react";

const P = {
  bg:"#E8DFD2", bgCard:"rgba(58,44,28,0.055)", text:"#2A2018",
  muted:"rgba(42,32,24,0.52)", dimmed:"rgba(42,32,24,0.24)",
  sand:"#8C5E28", sandDim:"rgba(140,94,40,0.1)", sandBorder:"rgba(140,94,40,0.22)",
  sage:"#3A6855", sageDim:"rgba(58,104,85,0.1)", sageBorder:"rgba(58,104,85,0.22)",
  terra:"#8A3218", terraDim:"rgba(138,50,24,0.1)", terraBorder:"rgba(138,50,24,0.22)",
  moss:"#4A6C46", mossDim:"rgba(74,108,70,0.1)", border:"rgba(42,32,24,0.12)",
};
const ease="cubic-bezier(0.16,1,0.3,1)";
const SERIF="'DM Serif Display',Georgia,serif";
const SANS="'Inter','Helvetica Neue',Arial,sans-serif";
const MONO="'JetBrains Mono','Fira Mono',monospace";
const TOTAL=13;

const col=c=>c==="terra"?P.terra:c==="moss"?P.moss:c==="sage"?P.sage:P.sand;
const bg=c=>c==="terra"?P.terraDim:c==="moss"?P.mossDim:c==="sage"?P.sageDim:P.sandDim;
const brd=c=>c==="terra"?P.terraBorder:c==="moss"?"rgba(74,108,70,0.22)":c==="sage"?P.sageBorder:P.sandBorder;
const tr=(d,e=0)=>"opacity 0.7s "+ease+" "+(d+e)+"s, transform 0.7s "+ease+" "+(d+e)+"s";
const fade=(d)=>"opacity 0.7s "+ease+" "+d+"s";

function Badge({label,color,sx}){
  const s=Object.assign({display:"inline-block",fontSize:11,letterSpacing:4,fontWeight:600,textTransform:"uppercase",fontFamily:MONO,color:col(color),background:bg(color),padding:"7px 18px",borderRadius:4,border:"1px solid "+brd(color)},sx||{});
  return <span style={s}>{label}</span>;
}
function ClientPill({label}){
  return <span style={{display:"inline-block",fontSize:11,letterSpacing:2,fontWeight:500,fontFamily:MONO,color:P.muted,background:P.bgCard,border:"1px solid "+P.border,padding:"5px 12px",borderRadius:3,textTransform:"uppercase"}}>{label}</span>;
}
function Stat({value,label,color,delay,active}){
  return(
    <div style={{textAlign:"center",padding:"36px 28px",background:P.bgCard,border:"1px solid "+P.border,borderRadius:12,opacity:active?1:0,transform:active?"translateY(0)":"translateY(18px)",transition:tr(delay||0)}}>
      <div style={{fontSize:80,fontFamily:SERIF,color:col(color),lineHeight:1}}>{value}</div>
      <div style={{fontSize:16,fontFamily:SANS,color:P.muted,marginTop:10,letterSpacing:0.5}}>{label}</div>
    </div>
  );
}
function CompactStat({value,label,color,delay,active,compact}){
  return(
    <div style={{textAlign:"center",padding:compact?"16px 16px":"28px 20px",background:P.bgCard,border:"1px solid "+P.border,borderRadius:12,opacity:active?1:0,transform:active?"translateY(0)":"translateY(14px)",transition:tr(delay||0),flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontSize:compact?50:64,fontFamily:SERIF,color:col(color),lineHeight:1}}>{value}</div>
      <div style={{fontSize:compact?12:14,fontFamily:SANS,color:P.muted,marginTop:compact?8:12,lineHeight:1.45,maxWidth:200}}>{label}</div>
    </div>
  );
}
function CompactBeforeMetric({value,label,color,active,delay}){
  return(
    <div style={{flex:1,padding:"18px 16px",background:bg(color),border:"1px solid "+brd(color),borderRadius:10,textAlign:"center",opacity:active?1:0,transform:active?"translateY(0)":"translateY(10px)",transition:tr(delay||0)}}>
      <div style={{fontSize:38,fontFamily:SERIF,color:col(color),lineHeight:1}}>{value}</div>
      <div style={{fontSize:13,fontFamily:SANS,color:P.muted,marginTop:8,lineHeight:1.3}}>{label}</div>
    </div>
  );
}
function ICircle({Icon,color,size}){
  const sz=size||56;
  return <div style={{width:sz,height:sz,borderRadius:"50%",background:bg(color),border:"1px solid "+brd(color),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={sz*0.42} color={col(color)} strokeWidth={1.6}/></div>;
}
function Note({color,children,active}){
  return(
    <div style={{padding:"16px 20px",background:bg(color),border:"1px solid "+brd(color),borderRadius:8,opacity:active?1:0,transition:fade(1.0)}}>
      <div style={{fontSize:10,fontFamily:MONO,color:col(color),letterSpacing:5,textTransform:"uppercase"}}>We learned</div>
      <div style={{fontSize:13,fontFamily:SANS,color:P.muted,marginTop:6,lineHeight:1.6}}>{children}</div>
    </div>
  );
}
function Bullets({items,color,active,size}){
  const fs=size||15;
  return(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {items.map(function(t,i){
        return(
          <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,opacity:active?1:0,transform:active?"translateX(0)":"translateX(-10px)",transition:tr(0.3+i*0.08)}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:col(color),flexShrink:0,marginTop:7}}/>
            <div style={{fontSize:fs,fontFamily:SANS,color:P.muted,lineHeight:1.55}}>{t}</div>
          </div>
        );
      })}
    </div>
  );
}
function VDivider({active}){
  return <div style={{width:1,background:P.border,flexShrink:0,opacity:active?1:0,transition:fade(0.2)}}/>;
}
function HDivider({active}){
  return <div style={{height:1,background:P.border,opacity:active?1:0,transition:fade(0.2)}}/>;
}
function SectionLabel({text,color,active}){
  return(
    <div style={{fontSize:11,fontFamily:MONO,color:color?col(color):P.muted,letterSpacing:5,textTransform:"uppercase",opacity:active?1:0,transition:fade(0.18),marginBottom:4}}>{text}</div>
  );
}
function WH({active}){
  return(
    <svg width="760" height="620" viewBox="0 0 320 260" style={{opacity:active?0.72:0,transition:"opacity 1.1s "+ease+" 0.5s"}}>
      <line x1="10" y1="245" x2="310" y2="245" stroke={P.sand} strokeWidth="1.5" strokeOpacity="0.4"/>
      {[[20,80,68],[118,60,78],[226,80,82]].map(function(r,ri){
        var x=r[0],w=r[2];
        var c=ri===1?P.sage:P.sand;
        return(
          <g key={ri} opacity="0.75">
            <rect x={x} y={ri===1?60:80} width="6" height={ri===1?185:175} rx="1" fill={c} fillOpacity="0.35"/>
            <rect x={x+w} y={ri===1?60:80} width="6" height={ri===1?185:175} rx="1" fill={c} fillOpacity="0.35"/>
            {[0,1,2,3].map(function(j){return <rect key={j} x={x} y={(ri===1?70:90)+j*40} width={w} height="3" rx="1" fill={c} fillOpacity="0.45"/>;
            })}
            {[[10,13,P.sage,0.3],[45,11,P.sand,0.28],[10,13,P.terra,0.25],[50,13,P.sage,0.28]].map(function(p,j){
              return <rect key={j} x={x+5} y={(ri===1?77:97)+j*40} width={p[0]} height={p[1]} rx="1" fill={p[2]} fillOpacity={p[3]} stroke={p[2]} strokeWidth="0.8" strokeOpacity={p[3]+0.1}/>;
            })}
          </g>
        );
      })}
      <g opacity="0.5">
        <rect x="148" y="228" width="30" height="16" rx="2" fill={P.sand} fillOpacity="0.4" stroke={P.sand} strokeWidth="0.8" strokeOpacity="0.5"/>
        <rect x="148" y="224" width="4" height="20" rx="1" fill={P.sand} fillOpacity="0.5"/>
        <circle cx="156" cy="244" r="4" fill="none" stroke={P.sand} strokeWidth="1.2" strokeOpacity="0.5"/>
        <circle cx="172" cy="244" r="4" fill="none" stroke={P.sand} strokeWidth="1.2" strokeOpacity="0.5"/>
      </g>
    </svg>
  );
}

function CaseStudySlide({num,color,title,subtitle,situation,beforeMetrics,bullets,note,stats,active}){
  var isCompact=stats.length>=4;
  var tags=subtitle.split(' · ');
  return(
    <div style={{position:"relative",display:"flex",flexDirection:"column",height:"100%",padding:"44px 80px",gap:14,overflow:"hidden"}}>
      <div style={{position:"absolute",right:-16,bottom:-40,fontSize:360,fontFamily:SERIF,color:col(color),opacity:0.05,lineHeight:1,pointerEvents:"none",userSelect:"none",zIndex:0}}>{num}</div>

      {/* ── Header: badge left, pills right, title below ── */}
      <div style={{opacity:active?1:0,transition:fade(0.1),zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <Badge label={"Case Study "+num} color={color}/>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {tags.map(function(tag,i){
              return(
                <span key={i} style={{fontSize:11,fontFamily:MONO,letterSpacing:2,fontWeight:500,color:col(color),background:bg(color),border:"1px solid "+brd(color),padding:"6px 16px",borderRadius:20,textTransform:"uppercase",whiteSpace:"nowrap"}}>{tag}</span>
              );
            })}
          </div>
        </div>
        <div style={{fontSize:52,fontFamily:SERIF,color:P.text,lineHeight:1,letterSpacing:-1}}>{title}</div>
      </div>

      <HDivider active={active}/>

      {/* ── Body: Left story | Right numbers ── */}
      <div style={{display:"flex",flex:1,gap:52,minHeight:0,zIndex:1}}>

        {/* Left: situation → before metrics → bullets */}
        <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>

          <div style={{opacity:active?1:0,transform:active?"translateY(0)":"translateY(12px)",transition:tr(0.2)}}>
            <div style={{fontSize:11,fontFamily:MONO,color:col(color),letterSpacing:5,textTransform:"uppercase",marginBottom:12}}>The situation</div>
            <div style={{fontSize:19,fontFamily:SERIF,color:P.text,lineHeight:1.75}}>{situation}</div>
          </div>

          <div style={{display:"flex",gap:14}}>
            {beforeMetrics.map(function(m,i){
              return <CompactBeforeMetric key={i} value={m.v} label={m.l} color={color} active={active} delay={0.3+i*0.09}/>;
            })}
          </div>

          <div style={{opacity:active?1:0,transform:active?"translateY(0)":"translateY(10px)",transition:tr(0.38)}}>
            <div style={{fontSize:11,fontFamily:MONO,color:col(color),letterSpacing:5,textTransform:"uppercase",marginBottom:14}}>What we configured</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {bullets.map(function(t,i){
                return(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,opacity:active?1:0,transform:active?"translateX(0)":"translateX(-10px)",transition:tr(0.42+i*0.07)}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:col(color),flexShrink:0,marginTop:9}}/>
                    <div style={{fontSize:17,fontFamily:SANS,color:P.muted,lineHeight:1.6}}>{t}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <VDivider active={active}/>

        {/* Right: outcome stats */}
        <div style={{flex:0.7,display:"flex",flexDirection:"column",gap:isCompact?8:12}}>
          <div style={{fontSize:11,fontFamily:MONO,color:col(color),letterSpacing:5,textTransform:"uppercase",marginBottom:2}}>Outcomes</div>
          {stats.map(function(s,i){
            return <CompactStat key={i} value={s.v} label={s.l} color={s.c||color} delay={0.48+i*0.11} active={active} compact={isCompact}/>;
          })}
        </div>
      </div>

      {/* ── Footer: We learned ── */}
      <div style={{opacity:active?1:0,transition:fade(0.85),zIndex:1,padding:"18px 26px",background:bg(color),borderLeft:"4px solid "+col(color),borderRadius:"0 10px 10px 0"}}>
        <div style={{fontSize:10,fontFamily:MONO,color:col(color),letterSpacing:5,textTransform:"uppercase",marginBottom:9}}>We learned</div>
        <div style={{fontSize:16,fontFamily:SANS,color:P.text,lineHeight:1.65,opacity:0.78}}>{note}</div>
      </div>
    </div>
  );
}

var scenes=[

// 01 TITLE
function S01({active}){
  return(
    <div style={{position:"relative",display:"flex",height:"100%",alignItems:"center",overflow:"hidden"}}>
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:"52%",display:"flex",alignItems:"center",justifyContent:"center",zIndex:0}}>
        <WH active={active}/>
      </div>
      <div style={{paddingLeft:100,display:"flex",flexDirection:"column",gap:28,maxWidth:660,zIndex:1}}>
        <div style={{opacity:active?1:0,transform:active?"translateY(0)":"translateY(16px)",transition:tr(0.1)}}>
          <Badge label="EWM Practices in Consumer Packaged Goods" color="sage" sx={{whiteSpace:"nowrap"}}/>
        </div>
        <div style={{opacity:active?1:0,transform:active?"translateY(0)":"translateY(24px)",transition:tr(0.28)}}>
          <div style={{fontSize:96,fontFamily:SERIF,color:P.text,lineHeight:1.0,letterSpacing:-2}}>
            Warehouse<br/><em style={{color:P.sand}}>Excellence</em><br/>in CPG
          </div>
        </div>
        <div style={{opacity:active?1:0,transition:fade(0.55)}}>
          <div style={{width:48,height:2,background:P.sand,borderRadius:2,marginBottom:18}}/>
          <div style={{fontSize:20,fontFamily:SANS,color:P.muted,lineHeight:1.65,maxWidth:420}}>SAP EWM implementations across distribution, perishables, and fulfillment operations.</div>
        </div>
      </div>
      <div style={{position:"absolute",bottom:52,left:100,right:80,display:"flex",alignItems:"center",justifyContent:"space-between",opacity:active?1:0,transition:fade(0.9),zIndex:1}}>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{fontSize:10,fontFamily:MONO,letterSpacing:3,color:P.dimmed,textTransform:"uppercase"}}>Prepared for</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:P.sandDim,border:"1px solid "+P.sandBorder,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="5" r="3" fill="none" stroke={P.sand} strokeWidth="1.2"/><path d="M2 13c0-3 2-5 5-5s5 2 5 5" fill="none" stroke={P.sand} strokeWidth="1.2" strokeLinecap="round"/></svg>
            </div>
            <div>
              <div style={{fontSize:18,fontFamily:SERIF,color:P.sand,letterSpacing:-0.5,lineHeight:1}}>Flora</div>
              <div style={{fontSize:12,fontFamily:SANS,color:P.muted,fontWeight:300}}>Food Group</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
          <div style={{fontSize:10,fontFamily:MONO,letterSpacing:3,color:P.dimmed,textTransform:"uppercase"}}>Presented by</div>
          <img src="/tarento-logo.svg" height="34" alt="Tarento" style={{opacity:0.72,filter:"sepia(0.2)"}}/>
        </div>
      </div>
    </div>
  );
},

// 02 SETTING THE STAGE
function S02({active}){
  var blocks=[
    {Icon:Layers,color:"sage",num:"01",title:"What you will see",body:"Experiences and patterns from live SAP EWM implementations across CPG and beyond. You will see real warehouse operations — food, beverage, kitting, D2C — and the specific automation decisions that drove measurable results in each."},
    {Icon:Workflow,color:"sand",num:"02",title:"We heard you",body:"This deck directly addresses what was requested: use cases, automation, lessons learned, and inbound/outbound best practices. Every section maps to a specific conversation we had with your team prior to this session."},
    {Icon:Cpu,color:"terra",num:"03",title:"Grounded in what we deployed",body:"Every use case and lesson here comes from a live implementation, not a reference architecture. When we quote 99.6% FEFO adherence or same-day kitting — those numbers were measured on active systems, in real warehouses."},
    {Icon:Users,color:"moss",num:"04",title:"Currently agnostic to your specifics",body:"We do not yet know your process or technology landscape. The BLIXT session is where that changes. Everything here is directional — it becomes specific once we understand your operation, your constraints, and your priorities."},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"60px 80px",gap:20}}>
      <div style={{opacity:active?1:0,transition:fade(0.1)}}>
        <Badge label="Setting the Stage" color="sage"/>
        <div style={{fontSize:64,fontFamily:SERIF,color:P.text,marginTop:16}}>Before we begin</div>
        <div style={{fontSize:18,fontFamily:SANS,color:P.muted,marginTop:8}}>Four things worth knowing about what follows.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginTop:16}}>
        {blocks.map(function(b,i){
          return(
            <div key={i} style={{padding:"36px 32px",background:bg(b.color),border:"1px solid "+brd(b.color),borderRadius:14,display:"flex",gap:24,alignItems:"flex-start",minHeight:220,opacity:active?1:0,transform:active?"translateY(0)":"translateY(18px)",transition:tr(0.2+i*0.12)}}>
              <ICircle Icon={b.Icon} color={b.color} size={56}/>
              <div>
                <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:12}}>
                  <span style={{fontSize:11,fontFamily:MONO,letterSpacing:4,color:col(b.color)}}>{b.num}</span>
                  <span style={{fontSize:22,fontFamily:SERIF,color:P.text}}>{b.title}</span>
                </div>
                <div style={{fontSize:16,fontFamily:SANS,color:P.muted,lineHeight:1.7}}>{b.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
},

// 03 WHERE WE WORKED
function S03({active}){
  var cpg=[
    {title:"Food & perishables",sub:"Short shelf-life, cold chain, regulatory batch traceability, multi-country distribution",client:"APJ customer"},
    {title:"High-volume beverage",sub:"50,000+ pallet/day, multi-channel dispatch across retail, distributor and e-commerce",client:"European customer"},
    {title:"Promotional kitting",sub:"Seasonal product launches and gift bundle operations with tight windows",client:"Cosmetics client"},
    {title:"D2C and marketplace fulfillment",sub:"High-volume small-order consumer fulfillment where a single mis-pick costs more than the margin",client:"Household products client"},
  ];
  var beyond=[
    {title:"Biotech / Life Sciences (CDMO)",sub:"Embedded EWM on S/4HANA for biologics and vaccine manufacturing. RFUI, ASRS integration, automated replenishment.",client:"APJ client"},
    {title:"Automotive / EV Manufacturing",sub:"EWM on S/4HANA Cloud for India's largest electric two-wheeler manufacturer. Fiori and RF gate entry integration.",client:"India client"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"60px 80px",gap:28}}>
      <div style={{opacity:active?1:0,transition:fade(0.1)}}>
        <Badge label="Where We Have Worked" color="sage"/>
        <div style={{fontSize:64,fontFamily:SERIF,color:P.text,marginTop:16}}>CPG and beyond</div>
        <div style={{fontSize:16,fontFamily:SANS,color:P.muted,marginTop:8,fontStyle:"italic",maxWidth:700}}>We are highlighting the following areas for this conversation. They do not represent the full extent of our EWM work — rather the most relevant ones.</div>
      </div>
      <div style={{display:"flex",gap:36,flex:1}}>
        <div style={{flex:1.2,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:12,letterSpacing:6,textTransform:"uppercase",color:P.sage,fontFamily:MONO,marginBottom:4}}>CPG</div>
          {cpg.map(function(r,i){
            return(
              <div key={i} style={{padding:"18px 24px",background:P.bgCard,border:"1px solid "+P.border,borderRadius:10,flex:1,opacity:active?1:0,transform:active?"translateX(0)":"translateX(-16px)",transition:tr(0.25+i*0.1)}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                  <div style={{fontSize:18,fontFamily:SERIF,color:P.text}}>{r.title}</div>
                  <ClientPill label={r.client}/>
                </div>
                <div style={{fontSize:14,fontFamily:SANS,color:P.muted,marginTop:6}}>{r.sub}</div>
              </div>
            );
          })}
        </div>
        <VDivider active={active}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:12,letterSpacing:6,textTransform:"uppercase",color:P.sand,fontFamily:MONO,marginBottom:4}}>Beyond CPG</div>
          {beyond.map(function(r,i){
            return(
              <div key={i} style={{padding:"18px 24px",background:P.bgCard,border:"1px solid "+P.sandBorder,borderRadius:10,flex:1,opacity:active?1:0,transform:active?"translateX(0)":"translateX(16px)",transition:tr(0.45+i*0.1)}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                  <div style={{fontSize:18,fontFamily:SERIF,color:P.sand}}>{r.title}</div>
                  <ClientPill label={r.client}/>
                </div>
                <div style={{fontSize:14,fontFamily:SANS,color:P.muted,marginTop:6}}>{r.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
},

// 04 CASE STUDY 01 — merged
function S04({active}){
  return <CaseStudySlide
    num="01" color="sand" active={active}
    title="Food & perishables"
    subtitle="APJ customer · Cold storage · Multi-country distribution"
    situation="We walked into an APJ customer operating across four geographies where short shelf-life products moved through cold storage with batch tracking done entirely on paper. FEFO compliance depended on individual operators remembering which pallet arrived first — recall preparation routinely took over four hours."
    beforeMetrics={[{v:"4+ hrs",l:"Recall prep"},{v:"~70%",l:"FEFO adherence"},{v:"Paper",l:"Batch tracking"}]}
    bullets={["Batch management capturing supplier batch and expiry at goods receipt","FEFO enforced at warehouse task level — no operator could pick a newer batch while an older one remained","Shelf-life validation at packing to block expired stock from shipping","Cold storage zones enforced at bin level","Quality inspection integration before outbound release"]}
    note="Traceability is only as strong as the data captured at goods receipt. FEFO fails when expiry dates are entered incorrectly at inbound. We locked every design decision affecting batch data before configuration began."
    stats={[{v:"40%",l:"Reduction in product waste from expiry",c:"sand"},{v:"<20 min",l:"Recall response time (was 4+ hours)",c:"sage"},{v:"99.6%",l:"FEFO adherence (was ~70% manually)",c:"moss"}]}
  />;
},

// 05 CASE STUDY 02 — merged
function S05({active}){
  return <CaseStudySlide
    num="02" color="sage" active={active}
    title="High-volume beverage"
    subtitle="European customer · 50,000+ pallets/day · Multi-country"
    situation="We inherited a site moving 50,000+ pallets a day where trucks were queuing outside because dock assignment was manual. Pickers built their own sequence each morning — a coordination problem that took an hour to untangle before any warehouse work could begin."
    beforeMetrics={[{v:"1 hr",l:"Lost to coordination"},{v:"Manual",l:"Dock assignment"},{v:"Unsync'd",l:"Wave vs. yard"}]}
    bullets={["Yard management for truck arrival sequencing and dock assignment","Wave management grouping orders by route and carrier cut-off","RF-guided execution across pick, pack, and stage in a single operator flow","Slotting repositioning fast-moving SKUs within 15m of dispatch staging","Labor management tracking lines per hour by shift"]}
    note="We designed Wave and Yard Management as one integrated solution. The 40% turnaround improvement only happened because we scoped and configured both together from day one."
    stats={[{v:"+30%",l:"Picking productivity",c:"sage"},{v:"-40%",l:"Truck turnaround time",c:"sand"},{v:"99%",l:"Inventory accuracy",c:"moss"},{v:"+25%",l:"Warehouse throughput",c:"sage"}]}
  />;
},

// 06 CASE STUDY 03 — merged
function S06({active}){
  return <CaseStudySlide
    num="03" color="terra" active={active}
    title="Promotional kitting"
    subtitle="Cosmetics client · Holiday gift sets · Fixed promotional calendar"
    situation="We were brought in by a cosmetics company running holiday gift sets with a fixed launch calendar. Kitting was done manually with paper pick lists and no standardised work instructions. A 3-day repackaging delay on a 6-week window is not a process problem — it is a revenue problem."
    beforeMetrics={[{v:"3 days",l:"Kitting lead time"},{v:"Paper",l:"Pick list method"},{v:"Manual",l:"Work instructions"}]}
    bullets={["Value Added Services (VAS) module for kitting with work instructions at each packing station","Packaging specifications standardised per bundle: scan-to-confirm, no operator interpretation required","Work Center Management balancing kitting workload across stations in real time","RF execution replacing paper pick lists with live task assignments"]}
    note="We froze kit definitions before EWM configuration began. A BOM change after Work Centres and Packaging Specifications are built cascades across the entire setup — scope finalisation directly protects the launch date."
    stats={[{v:"Same day",l:"Kitting lead time (was 3 days)",c:"terra"},{v:"35%",l:"Faster promotional launch",c:"sand"},{v:"80%",l:"Reduction in manual errors",c:"sage"}]}
  />;
},

// 07 CASE STUDY 04 — merged
function S07({active}){
  return <CaseStudySlide
    num="04" color="moss" active={active}
    title="D2C & marketplace"
    subtitle="Household products client · Returns 15–20% · Multi-platform"
    situation="We took on a household products company fulfilling high-volume, small-quantity online orders with returns running at 15–20%. Every mis-pick cost more than the margin on the order. Shipping costs kept rising because carton selection was manual and oversized boxes were the default."
    beforeMetrics={[{v:"5 days",l:"Returns to shelf"},{v:"Manual",l:"Carton selection"},{v:"Rising",l:"Shipping cost"}]}
    bullets={["Cartonization selecting the right box size per order automatically","Pick-Pack-Pass keeping orders in one continuous flow","Pick-face replenishment so pickers never walked to reserve storage mid-wave","Returns processing as a structured RF workflow: condition check, restock decision, bin assignment"]}
    note="Cartonization savings only materialise if item volumetric data in the material master is accurate. We ran a structured item dimensioning exercise before go-live — that is what separated projected ROI from actual ROI."
    stats={[{v:"96%",l:"Same-day dispatch rate",c:"sand"},{v:"-40%",l:"Shipping cost per order",c:"sage"},{v:"99.3%",l:"Order accuracy",c:"moss"},{v:"48 hrs",l:"Returns back-to-shelf",c:"terra"}]}
  />;
},

// 08 STOCK MANAGEMENT
function S08({active}){
  var cards=[
    {Icon:TrendingUp,label:"Slotting",title:"Fast-mover repositioning",body:"We repositioned fast-moving SKUs quarterly using pick frequency data. For one client managing 15,000+ active SKUs, top-velocity items moved within 15m of dispatch staging — picker travel time dropped 30%.",client:"High-volume beverage client",color:"sage"},
    {Icon:Clock,label:"FEFO",title:"Expiry-driven rotation",body:"We enforced expiry-driven stock rotation at warehouse task level. Operators could not pick a newer batch while an older one remained. Shelf-life validation at packing blocked expired stock from shipping.",client:"Dairy and perishables client",color:"terra"},
    {Icon:Package,label:"Batch HU",title:"Supplier batch at receipt",body:"We captured supplier batch and expiry date at goods receipt, not retrospectively. Every pallet became traceable in EWM by batch, HU, and bin. Recall response time dropped from 4+ hours to under 20 minutes.",client:"Food manufacturing client",color:"sand"},
    {Icon:Zap,label:"Replenishment",title:"Pick-face auto-trigger",body:"We triggered automatic replenishment from reserve storage to active pick locations within the pick wave. Pickers never walked to reserve storage mid-wave.",client:"D2C and marketplace client",color:"sage"},
    {Icon:Target,label:"RF Accuracy",title:"99% inventory precision",body:"We used RF-guided execution across pick, pack, and stage to eliminate manual count discrepancies. Stock visibility in EWM reflected physical reality in real time across 50,000+ pallet/day operations.",client:"Beverage distribution client",color:"moss"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"60px 80px",gap:28}}>
      <div style={{opacity:active?1:0,transition:fade(0.1)}}>
        <Badge label="Stock Management" color="moss"/>
        <div style={{fontSize:60,fontFamily:SERIF,color:P.text,marginTop:16}}>What we addressed across CPG</div>
        <div style={{fontSize:16,fontFamily:SANS,color:P.muted,marginTop:8}}>Stock challenges surface differently depending on the operation. Here is how we have approached them.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:18,flex:1}}>
        {cards.map(function(c,i){
          return(
            <div key={i} style={{padding:"28px 22px",background:bg(c.color),border:"1px solid "+brd(c.color),borderRadius:12,display:"flex",flexDirection:"column",gap:14,opacity:active?1:0,transform:active?"translateY(0)":"translateY(20px)",transition:tr(0.2+i*0.1)}}>
              <ICircle Icon={c.Icon} color={c.color} size={48}/>
              <div>
                <div style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:col(c.color),fontFamily:MONO,marginBottom:6}}>{c.label}</div>
                <div style={{fontSize:17,fontFamily:SERIF,color:P.text,lineHeight:1.3}}>{c.title}</div>
              </div>
              <div style={{fontSize:14,fontFamily:SANS,color:P.muted,lineHeight:1.65,flex:1}}>{c.body}</div>
              <ClientPill label={c.client}/>
            </div>
          );
        })}
      </div>
    </div>
  );
},

// 09 AUTOMATION INNOVATIONS
function S09({active}){
  var cards=[
    {num:"01",title:"Auto HU creation at inbound",body:"We triggered this at goods receipt for high-volume shipments. Palletisation applied without manual input — inbound cycle time dropped by 40%.",color:"sage",client:"APJ customer · Food & perishables"},
    {num:"02",title:"Dynamic slotting",body:"We repositioned fast-movers quarterly based on pick frequency data. For one customer with 15,000+ active SKUs, picker travel time dropped by 30%.",color:"sand",client:"European customer · Beverage"},
    {num:"03",title:"Single-flow RF: pick to pack to stage",body:"We replaced three separate transactions with one uninterrupted RF flow. Operator training time dropped from 3 days to half a day.",color:"terra",client:"Cosmetics client · Kitting"},
    {num:"04",title:"Warehouse scheduling engine",body:"We built a real-time engine releasing pick tasks based on bay capacity, lead time, customer priority, and route departure. Planners shifted to managing exceptions only.",color:"moss",client:"European customer · Beverage"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"60px 80px",gap:28}}>
      <div style={{opacity:active?1:0,transition:fade(0.1)}}>
        <Badge label="Automation Innovations" color="sand"/>
        <div style={{fontSize:60,fontFamily:SERIF,color:P.text,marginTop:16}}>Four things we built</div>
        <div style={{fontSize:16,fontFamily:SANS,color:P.muted,marginTop:8}}>Beyond standard EWM configuration — work delivered on live customer implementations</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,flex:1}}>
        {cards.map(function(c,i){
          return(
            <div key={i} style={{padding:"36px 32px",background:bg(c.color),border:"1px solid "+brd(c.color),borderRadius:14,display:"flex",flexDirection:"column",gap:16,opacity:active?1:0,transform:active?"translateY(0)":"translateY(18px)",transition:tr(0.2+i*0.12)}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:11,letterSpacing:4,color:col(c.color),fontFamily:MONO}}>{c.num}</span>
                <ClientPill label={c.client}/>
              </div>
              <div style={{fontSize:24,fontFamily:SERIF,color:P.text,lineHeight:1.25}}>{c.title}</div>
              <div style={{fontSize:17,fontFamily:SANS,color:P.muted,lineHeight:1.65,flex:1}}>{c.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
},

// 10 SCHEDULING ENGINE
function S10({active}){
  var params=[
    {num:"01",label:"Packing bay capacity",sub:"We monitored live utilisation of each packing area, preventing starvation or overflow"},
    {num:"02",label:"Order lead time",sub:"Processing time remaining before each order's cut-off window"},
    {num:"03",label:"Customer priority tier",sub:"We applied differentiated priority rules by customer type automatically"},
    {num:"04",label:"Route departure schedule",sub:"We used outbound route timings to sequence which orders released first"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"60px 80px",gap:28}}>
      <div style={{opacity:active?1:0,transition:fade(0.1)}}>
        <Badge label="Automation Deep Dive" color="terra"/>
        <div style={{fontSize:56,fontFamily:SERIF,color:P.text,marginTop:16}}>Warehouse scheduling engine</div>
        <div style={{fontSize:16,fontFamily:SANS,color:P.muted,marginTop:8}}>We built a real-time engine that moved planners from managing queues to managing exceptions</div>
      </div>
      <div style={{flex:1,display:"flex",gap:56,alignItems:"stretch"}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:14}}>
          {params.map(function(r,i){
            return(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:20,padding:"24px 28px",background:P.bgCard,border:"1px solid "+P.border,borderRadius:10,flex:1,opacity:active?1:0,transform:active?"translateX(0)":"translateX(-14px)",transition:tr(0.3+i*0.1)}}>
                <div style={{fontSize:11,letterSpacing:3,color:P.terra,fontFamily:MONO,marginTop:3,flexShrink:0}}>{r.num}</div>
                <div>
                  <div style={{fontSize:20,fontFamily:SERIF,color:P.text}}>{r.label}</div>
                  <div style={{fontSize:16,fontFamily:SANS,color:P.muted,marginTop:6}}>{r.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,opacity:active?1:0,transform:active?"scale(1)":"scale(0.88)",transition:"opacity 0.8s "+ease+" 0.6s, transform 0.8s "+ease+" 0.6s",minWidth:340}}>
          <div style={{fontSize:11,letterSpacing:5,color:P.muted,textTransform:"uppercase",fontFamily:MONO}}>Output</div>
          <div style={{padding:"44px 52px",background:P.terraDim,border:"2px solid "+P.terraBorder,borderRadius:16,textAlign:"center",width:"100%"}}>
            <div style={{fontSize:13,fontFamily:MONO,color:P.terra,letterSpacing:3,textTransform:"uppercase"}}>Auto task release</div>
            <div style={{fontSize:17,fontFamily:SANS,color:P.muted,marginTop:12}}>No planner intervention</div>
          </div>
          <div style={{height:1,width:80,background:P.terraBorder}}/>
          <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%"}}>
            {["2–3 hrs / shift saved","Higher fulfilment rate","Exceptions-only management"].map(function(t,i){
              return <div key={i} style={{padding:"18px 22px",background:P.bgCard,border:"1px solid "+P.border,borderRadius:10,fontSize:16,fontFamily:SANS,color:P.muted,textAlign:"center"}}>{t}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
},

// 11 LESSONS
function S11({active}){
  var lessons=[
    {num:"01",Icon:Database,color:"sage",title:"Master data preparation must come first",body:"Materials, UoM, storage types, HU definitions, bin types. Every automation issue we have seen in production traces back to a master data gap that existed before go-live."},
    {num:"02",Icon:Users,color:"sand",title:"Make change management contractual",body:"Projects that treat change management as optional consistently produce post-go-live rework. Operator training hours, shadow-day support, and adoption KPIs belong in the contract."},
    {num:"03",Icon:Layers,color:"terra",title:"Phase automation by zone, not the whole warehouse",body:"We start with one conveyor lane or one sorter zone. PLC logic issues surface early and cutover risk stays contained. We scale after the first zone is stable."},
    {num:"04",Icon:AlertTriangle,color:"moss",title:"Design for exceptions first",body:"Short picks, damaged HUs, split pallets. A warehouse spends more time on these than the process maps suggest. The happy path only holds if exceptions are handled cleanly."},
    {num:"05",Icon:BarChart2,color:"sage",title:"KPIs drive acceptance, not sign-off dates",body:"Lines per hour, picks per FTE, HU cycle time, exception rates. We track from day one and tie go-live readiness to thresholds, not dates."},
    {num:"06",Icon:RefreshCw,color:"sand",title:"Keep test data synchronised across all systems",body:"ERP, EWM, and WCS must mirror each other in test. Misaligned datasets produce false positives. Production issues are frequently traceable to test data gaps."},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"60px 80px",gap:28}}>
      <div style={{opacity:active?1:0,transition:fade(0.1)}}>
        <Badge label="Lessons from the Field" color="sage"/>
        <div style={{fontSize:60,fontFamily:SERIF,color:P.text,marginTop:16}}>What we keep learning</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:18,flex:1}}>
        {lessons.map(function(c,i){
          return(
            <div key={i} style={{padding:"28px 26px",background:P.bgCard,border:"1px solid "+P.border,borderRadius:12,display:"flex",flexDirection:"column",gap:16,opacity:active?1:0,transform:active?"translateY(0)":"translateY(16px)",transition:tr(0.2+i*0.09)}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <ICircle Icon={c.Icon} color={c.color} size={48}/>
                <span style={{fontSize:11,letterSpacing:4,color:col(c.color),fontFamily:MONO}}>{c.num}</span>
              </div>
              <div style={{fontSize:19,fontFamily:SERIF,color:P.text,lineHeight:1.3}}>{c.title}</div>
              <div style={{fontSize:15,fontFamily:SANS,color:P.muted,lineHeight:1.65,flex:1}}>{c.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
},

// 12 BEST PRACTICES
function S12({active}){
  var inbound=[
    {Icon:Package,title:"Capture batch and expiry at receipt",sub:"Not retrospectively. A single incorrect entry in a short shelf-life operation can route the wrong batch to a customer."},
    {Icon:Cpu,title:"Automate HU creation for high-volume shipments",sub:"We trigger HU creation at goods receipt. Inbound cycle time reduced by 40% on high-volume implementations."},
    {Icon:Database,title:"Validate item master data before go-live",sub:"Materials, UoM, storage types, and bin definitions must be cleansed before go-live. Master data gaps cause most day-one failures."},
    {Icon:BarChart2,title:"Complete item dimensioning before cartonization",sub:"Volumetric data in the material master is rarely accurate at project start. Without a structured exercise, projected savings do not materialise."},
  ];
  var outbound=[
    {Icon:Workflow,title:"Design wave and yard management together",sub:"Wave not synchronised with dock sequencing moves congestion from pick floor to staging. We scope and configure both as one solution."},
    {Icon:Shield,title:"Enforce FEFO at the warehouse task level",sub:"Expiry-driven picking must be system-enforced. FEFO at task level means no operator can pick a newer batch while an older one is available."},
    {Icon:Zap,title:"Use a single RF flow for pick-pack-stage",sub:"One uninterrupted RF transaction from pick to pack to stage eliminates screen-switching and cuts operator training time significantly."},
    {Icon:RefreshCw,title:"Build returns as a structured RF workflow",sub:"Condition check, restock decision, bin assignment. Returns back-to-shelf from 5 days to 48 hours on one implementation."},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"60px 80px",gap:24}}>
      <div style={{opacity:active?1:0,transition:fade(0.1)}}>
        <Badge label="Best Practices" color="sand"/>
        <div style={{fontSize:56,fontFamily:SERIF,color:P.text,marginTop:16}}>Practices that have consistently worked</div>
        <div style={{fontSize:16,fontFamily:SANS,color:P.muted,marginTop:8}}>What we have found reliable across CPG implementations</div>
      </div>
      <div style={{display:"flex",gap:36,flex:1}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:10}}>
          <div style={{fontSize:12,letterSpacing:6,textTransform:"uppercase",color:P.sand,fontFamily:MONO,marginBottom:4}}>Inbound</div>
          {inbound.map(function(r,i){
            return(
              <div key={i} style={{padding:"16px 20px",background:P.sandDim,border:"1px solid "+P.sandBorder,borderRadius:10,flex:1,display:"flex",gap:16,alignItems:"center",opacity:active?1:0,transform:active?"translateX(0)":"translateX(-12px)",transition:tr(0.25+i*0.1)}}>
                <ICircle Icon={r.Icon} color="sand" size={40}/>
                <div>
                  <div style={{fontSize:16,fontFamily:SERIF,color:P.text}}>{r.title}</div>
                  <div style={{fontSize:13,fontFamily:SANS,color:P.muted,marginTop:4,lineHeight:1.5}}>{r.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
        <VDivider active={active}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:10}}>
          <div style={{fontSize:12,letterSpacing:6,textTransform:"uppercase",color:P.sage,fontFamily:MONO,marginBottom:4}}>Outbound</div>
          {outbound.map(function(r,i){
            return(
              <div key={i} style={{padding:"16px 20px",background:P.sageDim,border:"1px solid "+P.sageBorder,borderRadius:10,flex:1,display:"flex",gap:16,alignItems:"center",opacity:active?1:0,transform:active?"translateX(0)":"translateX(12px)",transition:tr(0.35+i*0.1)}}>
                <ICircle Icon={r.Icon} color="sage" size={40}/>
                <div>
                  <div style={{fontSize:16,fontFamily:SERIF,color:P.text}}>{r.title}</div>
                  <div style={{fontSize:13,fontFamily:SANS,color:P.muted,marginTop:4,lineHeight:1.5}}>{r.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
},

// 13 BLIXT CTA
function S13({active}){
  var agenda=[
    "Understand your current warehouse setup and where it sits on the EWM maturity curve",
    "Map your priorities to the use cases and patterns we have walked through today",
    "Identify the one point where automation has the highest impact for your operation specifically",
  ];
  return(
    <div style={{display:"flex",height:"100%",background:"#1C1510",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 68% 50%, rgba(58,104,85,0.2) 0%, transparent 60%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:-40,bottom:-60,fontSize:420,fontFamily:SERIF,color:"rgba(255,255,255,0.022)",lineHeight:1,pointerEvents:"none",userSelect:"none"}}>2</div>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px 80px 80px 100px",gap:32}}>
        <div style={{opacity:active?1:0,transition:fade(0.1)}}>
          <Badge label="Where We Start" color="sage" sx={{background:"rgba(58,104,85,0.2)",borderColor:"rgba(58,104,85,0.45)",color:"#72B89E"}}/>
          <div style={{fontSize:72,fontFamily:SERIF,color:"#F0E8DC",marginTop:22,lineHeight:1.05}}>
            Let's run a <em style={{color:"#72B89E"}}>BLIXT session</em>
          </div>
        </div>
        <div style={{opacity:active?1:0,transform:active?"translateY(0)":"translateY(14px)",transition:tr(0.3)}}>
          <div style={{fontSize:20,fontFamily:SANS,color:"rgba(240,232,220,0.58)",lineHeight:1.75,maxWidth:500}}>
            A focused 2-hour working session. We come in, we listen, and we leave with a shared picture of where to start.
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {agenda.map(function(t,i){
            return(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:20,opacity:active?1:0,transform:active?"translateX(0)":"translateX(-14px)",transition:tr(0.45+i*0.13)}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(58,104,85,0.25)",border:"1px solid rgba(58,104,85,0.5)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:11,fontFamily:MONO,color:"#72B89E",fontWeight:600}}>{String(i+1).padStart(2,"0")}</span>
                </div>
                <div style={{fontSize:18,fontFamily:SANS,color:"rgba(240,232,220,0.68)",lineHeight:1.65,paddingTop:5}}>{t}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{width:1,background:"rgba(255,255,255,0.08)",alignSelf:"stretch",opacity:active?1:0,transition:fade(0.2)}}/>
      <div style={{flex:0.9,display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px 100px 80px 80px",gap:24}}>
        <div style={{opacity:active?1:0,transform:active?"scale(1)":"scale(0.9)",transition:"all 0.9s "+ease+" 0.5s"}}>
          <div style={{padding:"60px 52px",background:"rgba(58,104,85,0.14)",border:"1px solid rgba(58,104,85,0.38)",borderRadius:20,textAlign:"center",display:"flex",flexDirection:"column",gap:20}}>
            <div style={{fontSize:13,fontFamily:MONO,color:"#72B89E",letterSpacing:5,textTransform:"uppercase"}}>The session</div>
            <div style={{fontSize:104,fontFamily:SERIF,color:"#72B89E",lineHeight:1}}>2 hrs</div>
            <div style={{width:48,height:1,background:"rgba(58,104,85,0.5)",margin:"0 auto"}}/>
            <div style={{fontSize:18,fontFamily:SANS,color:"rgba(240,232,220,0.58)",lineHeight:1.65}}>Your setup. Your priorities. Your highest-impact automation opportunity.</div>
          </div>
        </div>
        <div style={{opacity:active?1:0,transition:fade(0.85)}}>
          <div style={{fontSize:15,fontFamily:SANS,color:"rgba(240,232,220,0.35)",lineHeight:1.6,textAlign:"center",maxWidth:320,margin:"0 auto"}}>
            Not a scoping exercise but a working session that ends with something actionable.
          </div>
        </div>
      </div>
    </div>
  );
},

];

export default function Deck(){
  var [current,setCurrent]=useState(0);
  useEffect(function(){
    var l=document.createElement("link");
    l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;600&display=swap";
    document.head.appendChild(l);
  },[]);
  var go=useCallback(function(n){setCurrent(Math.max(0,Math.min(TOTAL-1,n)));},[]);
  useEffect(function(){
    function h(e){
      if(e.key==="ArrowRight"||e.key==="ArrowDown")go(current+1);
      if(e.key==="ArrowLeft"||e.key==="ArrowUp")go(current-1);
    }
    window.addEventListener("keydown",h);
    return function(){window.removeEventListener("keydown",h);};
  },[current,go]);
  return(
    <div style={{width:"100vw",height:"100vh",background:P.bg,position:"relative",overflow:"hidden",userSelect:"none"}}>
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.015,zIndex:0}}>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <rect width="100%" height="100%" filter="url(#grain)"/>
      </svg>
      <div onClick={function(){go(current-1);}} style={{position:"absolute",left:0,top:0,width:"8%",height:"100%",cursor:"w-resize",zIndex:10}}/>
      <div onClick={function(){go(current+1);}} style={{position:"absolute",right:0,top:0,width:"8%",height:"100%",cursor:"e-resize",zIndex:10}}/>
      {scenes.map(function(SC,i){
        return(
          <div key={i} style={{position:"absolute",inset:0,opacity:i===current?1:0,pointerEvents:i===current?"all":"none",transition:"opacity 0.5s "+ease,zIndex:1}}>
            <SC active={i===current}/>
          </div>
        );
      })}
      <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6,zIndex:5}}>
        {Array.from({length:TOTAL}).map(function(_,i){
          return <div key={i} onClick={function(){go(i);}} style={{height:3,borderRadius:2,width:i===current?24:6,background:i===current?P.sand:P.dimmed,transition:"width 0.4s "+ease+", background 0.4s",cursor:"pointer"}}/>;
        })}
      </div>
      <div style={{position:"absolute",bottom:22,right:32,fontSize:11,fontFamily:MONO,letterSpacing:2,color:P.dimmed,zIndex:5}}>
        {String(current+1).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")}
      </div>
    </div>
  );
}
