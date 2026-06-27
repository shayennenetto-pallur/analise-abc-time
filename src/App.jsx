import { useState } from 'react';

const CLASSIFICATIONS = [
  { id: 'A', label: 'A — Rock Star', desc: 'Alto desempenho, referência no time', bg: '#0d2818', text: '#2CC295', border: 'rgba(44,194,149,0.45)', dot: '#2CC295' },
  { id: 'A (potencial)', label: 'A (Potencial)', desc: 'Caminhando para ser um Rock Star', bg: '#102215', text: '#34d399', border: 'rgba(52,211,153,0.35)', dot: '#34d399' },
  { id: 'B', label: 'B — Consistente', desc: 'Entrega consistentemente, pilar do time', bg: '#0d1f38', text: '#58a6ff', border: 'rgba(88,166,255,0.4)', dot: '#58a6ff' },
  { id: 'C', label: 'C — Atrapalha', desc: 'Atrapalha o time e a entrega', bg: '#2a0f0f', text: '#f87171', border: 'rgba(248,113,113,0.4)', dot: '#f87171' },
];

const CONFIG = Object.fromEntries(CLASSIFICATIONS.map(c => [c.id, c]));

const inputStyle = {
  width: '100%',
  background: '#0d1117',
  border: '1px solid rgba(48,54,61,0.9)',
  borderRadius: 8,
  padding: '9px 12px',
  color: '#e6edf3',
  fontSize: 13,
  outline: 'none',
  transition: 'border-color 0.15s',
};

function Badge({ id }) {
  const c = CONFIG[id];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 6, padding: '3px 9px', fontSize: 11, fontWeight: 700,
      whiteSpace: 'nowrap', letterSpacing: '0.02em',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
      {id}
    </span>
  );
}

function PyramidTier({ ids, players, width, isTop, isBottom }) {
  const mainId = ids[0];
  const c = CONFIG[mainId];
  const allPlayers = players.filter(p => ids.includes(p.classificacao));
  const borderRadius = isTop ? '8px 8px 0 0' : isBottom ? '0 0 8px 8px' : '0';

  return (
    <div style={{
      width, margin: '0 auto',
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius,
      padding: '12px 16px',
      minHeight: 70,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {ids.map(id => (
          <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              width: 22, height: 22, background: `${CONFIG[id].dot}22`,
              border: `1.5px solid ${CONFIG[id].dot}`, borderRadius: 4,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, color: CONFIG[id].text, flexShrink: 0,
            }}>
              {id === 'A (potencial)' ? 'A*' : id}
            </span>
            <span style={{ fontSize: 11, color: `${CONFIG[id].text}aa`, fontWeight: 500 }}>
              {CONFIG[id].label.split('—')[1]?.trim() || CONFIG[id].label}
            </span>
          </div>
        ))}
      </div>

      {allPlayers.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {allPlayers.map(p => (
            <span key={p.id} style={{
              background: `${c.dot}12`, border: `1px solid ${c.dot}30`,
              borderRadius: 20, padding: '2px 10px', fontSize: 11,
              color: '#e6edf3', fontWeight: 500,
            }}>
              {p.nome}{p.funcao ? ` · ${p.funcao}` : ''}
            </span>
          ))}
        </div>
      ) : (
        <span style={{ fontSize: 11, color: 'rgba(139,148,158,0.35)' }}>nenhum colaborador</span>
      )}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({ nome: '', funcao: '', classificacao: 'A', comentario: '' });
  const [team, setTeam] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleAdd = () => {
    if (!form.nome.trim()) return;
    setTeam(prev => [...prev, { ...form, id: Date.now() }]);
    setForm({ nome: '', funcao: '', classificacao: 'A', comentario: '' });
  };

  const handleRemove = (id) => setTeam(prev => prev.filter(p => p.id !== id));

  const focusStyle = (name) => focusedInput === name
    ? { ...inputStyle, borderColor: '#2CC295' }
    : inputStyle;

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ maxWidth: 1140, margin: '0 auto 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{
            background: 'rgba(44,194,149,0.1)', border: '1px solid rgba(44,194,149,0.25)',
            borderRadius: 20, padding: '2px 10px', fontSize: 11,
            color: '#2CC295', fontWeight: 500, letterSpacing: '0.05em',
          }}>
            Dinâmica ABC
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Análise de Equipe
        </h1>
        <p style={{ fontSize: 13, color: '#8b949e' }}>
          Classifique colaboradores e visualize a dinâmica do seu time.
        </p>
        <div style={{ marginTop: 20, height: 1, background: 'rgba(48,54,61,0.9)' }} />
      </div>

      <div style={{
        maxWidth: 1140, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24, alignItems: 'start',
      }}>
        {/* Form */}
        <div style={{
          background: '#161b22', border: '1px solid rgba(48,54,61,0.9)',
          borderRadius: 12, padding: 24, position: 'sticky', top: 24,
        }}>
          <h2 style={{
            fontSize: 11, fontWeight: 600, color: '#2CC295',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20,
          }}>
            Adicionar colaborador
          </h2>

          {/* Nome */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
              Nome
            </label>
            <input
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              onFocus={() => setFocusedInput('nome')}
              onBlur={() => setFocusedInput(null)}
              onKeyDown={e => e.key === 'Enter' && form.nome.trim() && handleAdd()}
              placeholder="Ex: Maria"
              style={focusStyle('nome')}
            />
          </div>

          {/* Função */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
              Função
            </label>
            <input
              value={form.funcao}
              onChange={e => setForm({ ...form, funcao: e.target.value })}
              onFocus={() => setFocusedInput('funcao')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Ex: Financeiro"
              style={focusStyle('funcao')}
            />
          </div>

          {/* Classificação */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>
              Classificação
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CLASSIFICATIONS.map(cls => {
                const selected = form.classificacao === cls.id;
                return (
                  <button
                    key={cls.id}
                    onClick={() => setForm({ ...form, classificacao: cls.id })}
                    style={{
                      background: selected ? cls.bg : 'transparent',
                      border: `1px solid ${selected ? cls.border : 'rgba(48,54,61,0.9)'}`,
                      borderRadius: 8, padding: '9px 12px',
                      display: 'flex', alignItems: 'center', gap: 10,
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.12s',
                    }}
                  >
                    <span style={{
                      width: 26, height: 26, flexShrink: 0,
                      background: selected ? `${cls.dot}20` : '#21262d',
                      border: `1.5px solid ${selected ? cls.dot : 'rgba(48,54,61,0.9)'}`,
                      borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: selected ? cls.text : '#8b949e',
                    }}>
                      {cls.id === 'A (potencial)' ? 'A*' : cls.id}
                    </span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: selected ? cls.text : '#e6edf3' }}>
                        {cls.label}
                      </div>
                      <div style={{ fontSize: 11, color: '#8b949e', marginTop: 1 }}>
                        {cls.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comentário */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
              Comentário
            </label>
            <textarea
              value={form.comentario}
              onChange={e => setForm({ ...form, comentario: e.target.value })}
              onFocus={() => setFocusedInput('comentario')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Observações sobre o colaborador..."
              rows={3}
              style={{ ...focusStyle('comentario'), resize: 'vertical', minHeight: 72, lineHeight: 1.5 }}
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={!form.nome.trim()}
            style={{
              width: '100%', background: form.nome.trim() ? '#2CC295' : 'rgba(44,194,149,0.3)',
              color: form.nome.trim() ? '#0d1117' : 'rgba(44,194,149,0.5)',
              border: 'none', borderRadius: 8, padding: '11px',
              fontSize: 13, fontWeight: 700, cursor: form.nome.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            + Adicionar ao time
          </button>

          {team.length > 0 && (
            <div style={{ marginTop: 16, padding: '10px 12px', background: '#0d1117', borderRadius: 8, border: '1px solid rgba(48,54,61,0.9)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: '#8b949e' }}>Total no time</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#e6edf3' }}>{team.length}</span>
              </div>
              {CLASSIFICATIONS.map(cls => {
                const count = team.filter(p => p.classificacao === cls.id).length;
                if (!count) return null;
                return (
                  <div key={cls.id} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: cls.text }}>{cls.id}</span>
                    <span style={{ fontSize: 11, color: '#8b949e' }}>{count} pessoa{count > 1 ? 's' : ''}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {team.length === 0 && (
            <div style={{
              background: '#161b22', border: '1px dashed rgba(48,54,61,0.8)',
              borderRadius: 12, padding: '60px 32px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>👥</div>
              <p style={{ color: '#8b949e', fontSize: 13 }}>
                Adicione colaboradores para ver a análise e a pirâmide ABC.
              </p>
            </div>
          )}

          {/* Table */}
          {team.length > 0 && (
            <div style={{ background: '#161b22', border: '1px solid rgba(48,54,61,0.9)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(48,54,61,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: 11, fontWeight: 600, color: '#2CC295', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                  Tabela de Colaboradores
                </h2>
                <span style={{ fontSize: 11, color: '#8b949e' }}>{team.length} pessoa{team.length > 1 ? 's' : ''}</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#1c2128' }}>
                    {['Nome / Função', 'Pontuação ABC', 'Comentário', ''].map((h, i) => (
                      <th key={i} style={{
                        padding: '10px 16px', textAlign: 'left',
                        fontSize: 10, color: '#8b949e', fontWeight: 500,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        borderBottom: '1px solid rgba(48,54,61,0.9)',
                        width: i === 3 ? 40 : 'auto',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {team.map((p, i) => (
                    <tr
                      key={p.id}
                      style={{
                        background: i % 2 === 0 ? '#161b22' : '#1c2128',
                        borderBottom: i < team.length - 1 ? '1px solid rgba(48,54,61,0.5)' : 'none',
                      }}
                    >
                      <td style={{ padding: '12px 16px', minWidth: 140 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>{p.nome}</div>
                        {p.funcao && <div style={{ fontSize: 11, color: '#8b949e', marginTop: 2 }}>{p.funcao}</div>}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge id={p.classificacao} />
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 12, color: '#8b949e', maxWidth: 300, lineHeight: 1.5 }}>
                        {p.comentario || <span style={{ color: 'rgba(139,148,158,0.4)' }}>—</span>}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleRemove(p.id)}
                          title="Remover"
                          style={{
                            background: 'none', border: '1px solid transparent', borderRadius: 6,
                            color: '#8b949e', cursor: 'pointer', fontSize: 16, padding: '2px 6px',
                            lineHeight: 1, transition: 'all 0.1s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#8b949e'; e.currentTarget.style.borderColor = 'transparent'; }}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pyramid */}
          {team.length > 0 && (
            <div style={{ background: '#161b22', border: '1px solid rgba(48,54,61,0.9)', borderRadius: 12, padding: 24 }}>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 11, fontWeight: 600, color: '#2CC295', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                  Pirâmide ABC
                </h2>
                <p style={{ fontSize: 11, color: '#8b949e', marginTop: 4 }}>
                  Distribuição visual do time por classificação
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <PyramidTier ids={['A', 'A (potencial)']} players={team} width="44%" isTop />
                <PyramidTier ids={['B']} players={team} width="68%" />
                <PyramidTier ids={['C']} players={team} width="92%" isBottom />
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {CLASSIFICATIONS.map(cls => (
                  <div key={cls.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: cls.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: '#8b949e' }}>{cls.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
