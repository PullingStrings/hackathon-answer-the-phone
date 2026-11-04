import type { SVGProps } from 'react';

export type IconName =
  | 'computer'
  | 'speaker'
  | 'camera'
  | 'phone'
  | 'music'
  | 'disk'
  | 'star'
  | 'folder'
  | 'hourglass'
  | 'spark'
  | 'check'
  | 'mail';
type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export default function PixelIcon({ name, size = 36, ...props }: Props) {
  const line = { stroke: '#151522', strokeWidth: 1.5, strokeLinejoin: 'miter' as const };
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true" {...props}>
      {name === 'computer' && (
        <g {...line}>
          <path d="M10 3h31v30H9V5z" fill="#c6c6bd" />
          <path d="M12 6h25v22H12z" fill="#73736e" />
          <path d="M15 8h20v17H15z" fill="#000080" />
          <path d="M17 10h16v13H17z" fill="#086ad1" stroke="none" />
          <path d="M24 12h5v5h-5zM21 17h6v4h-6z" fill="#fff" stroke="none" />
          <path d="M10 3h31M10 4v28M11 31h27" stroke="#fff" />
          <path d="M23 33v3h9v-3M7 36h32l6 5v4H3v-4z" fill="#c6c6bd" />
          <path d="M7 37h31l4 4H5z" fill="#e4e4dc" />
          <path d="M7 43h17M33 43h6" stroke="#595954" />
        </g>
      )}
      {name === 'speaker' && (
        <g {...line}>
          <path d="M5 20h8l10-9v27l-10-9H5z" fill="#c0c0c0" />
          <path d="M28 17q8 7 0 14M33 10q16 14 0 28" strokeWidth="2" />
        </g>
      )}
      {name === 'camera' && (
        <g {...line}>
          <path d="M4 14h40v28H4z" fill="#777d89" />
          <path d="M10 14V8h11l4 6" fill="#c6c6c6" />
          <path d="M5 16h38v5H5z" fill="#c6c6c6" stroke="none" />
          <circle cx="26" cy="28" r="12" fill="#d5d5d5" />
          <circle cx="26" cy="28" r="9" fill="#25293b" />
          <circle cx="26" cy="28" r="5" fill="#4e799d" />
          <path d="M24 25h4v3h-4z" fill="#d7e9ee" stroke="none" />
          <rect x="8" y="19" width="6" height="5" fill="#fff" />
        </g>
      )}
      {name === 'phone' && (
        <g {...line}>
          <path d="M14 3h20l4 7v28l-4 7H14l-4-7V10z" fill="#263549" />
          <rect x="15" y="10" width="18" height="15" fill="#a9c28f" />
          <path d="M18 30h12M18 35h12M19 40h10" stroke="#ddd" strokeWidth="3" />
          <path d="M20 6h8" stroke="#777" />
        </g>
      )}
      {name === 'music' && (
        <g {...line}>
          <rect x="3" y="9" width="42" height="30" fill="#33343b" />
          <rect x="7" y="13" width="34" height="21" fill="#b6432d" />
          <path d="M8 14h32v7H8z" fill="#e7d7b3" stroke="none" />
          <rect x="11" y="21" width="26" height="10" fill="#303032" />
          <circle cx="16" cy="26" r="5" fill="#e8dbaa" />
          <circle cx="32" cy="26" r="5" fill="#e8dbaa" />
          <circle cx="16" cy="26" r="2" fill="#322d54" />
          <circle cx="32" cy="26" r="2" fill="#322d54" />
          <path d="M13 36h22" stroke="#aaa" />
        </g>
      )}
      {name === 'disk' && (
        <g {...line}>
          <path d="M6 4h30l7 7v33H6z" fill="#434687" />
          <rect x="13" y="4" width="22" height="16" fill="#c5c5c5" />
          <rect x="26" y="6" width="6" height="11" fill="#44454d" />
          <rect x="12" y="26" width="25" height="18" fill="#f7eedc" />
          <path d="M16 30h16M16 33h16" stroke="#777" />
          <path d="M14 37h21" stroke="#be3e36" />
          <path d="M14 39h21" stroke="#e6aa47" />
          <path d="M14 41h21" stroke="#3769a6" />
        </g>
      )}
      {name === 'folder' && (
        <g {...line}>
          <path d="M3 12h17l5 5h20v25H3z" fill="#e9ce79" />
          <path d="M3 12V7h18l4 5" fill="#fff2ad" />
          <path d="M3 22h42" />
        </g>
      )}
      {name === 'hourglass' && (
        <g {...line}>
          <path d="M10 3h28v5H10zM10 40h28v5H10z" fill="#6b5540" />
          <path d="M14 8h20v8L25 24l9 8v8H14v-8l9-8-9-8z" fill="#f5f5f0" />
          <path d="M17 15h14l-7 8-7-8zM17 37l7-9 7 9z" fill="#eaa237" />
          <path d="M16 10v5l6 7M16 33v5" stroke="#fff" />
        </g>
      )}
      {name === 'check' && <path d="M9 25l10 10L39 11" stroke="#168238" strokeWidth="6" />}
      {(name === 'star' || name === 'spark') && (
        <path {...line} d="M24 3l6 13 14 2-10 10 3 15-13-7-13 7 3-15L4 18l14-2z" fill="#f2d673" />
      )}
      {name === 'mail' && (
        <g {...line}>
          <rect x="4" y="9" width="40" height="30" fill="#efefec" />
          <path d="M5 11l19 15 19-15M5 37l13-12M43 37L30 25" stroke="#25294e" />
        </g>
      )}
    </svg>
  );
}
