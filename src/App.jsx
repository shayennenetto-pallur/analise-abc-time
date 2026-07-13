import { useState } from 'react';

const CLASSIFICATIONS = [
  { id: 'A', label: 'A — Rock Star', desc: 'Alto desempenho, referência no time', bg: '#0d2818', text: '#2CC295', border: 'rgba(44,194,149,0.45)', dot: '#2CC295' },
  { id: 'A (potencial)', label: 'A (Potencial)', desc: 'Caminhando para ser um Rock Star', bg: '#102215', text: '#34d399', border: 'rgba(52,211,153,0.35)', dot: '#34d399' },
  { id: 'B', label: 'B — Consistente', desc: 'Entrega consistente, não irá fazer além do esperado', bg: '#0d1f38', text: '#58a6ff', border: 'rgba(88,166,255,0.4)', dot: '#58a6ff' },
  { id: 'B (potencial)', label: 'B (Potencial)', desc: 'Crescendo, mas ainda inconsistente', bg: '#0a1a30', text: '#7cb9ff', border: 'rgba(124,185,255,0.3)', dot: '#7cb9ff' },
  { id: 'C', label: 'C — Atrapalha', desc: 'Atrapalha o time e a entrega', bg: '#2a0f0f', text: '#f87171', border: 'rgba(248,113,113,0.4)', dot: '#f87171' },
];

const CONFIG = Object.fromEntries(CLASSIFICATIONS.map(c => [c.id, c]));

const NINE_BOX_CONFIG = [
  { d: 'alto',  p: 'alto',  num: 9, label: 'Estrela',        color: '#2CC295', bg: '#0a2016' },
  { d: 'alto',  p: 'medio', num: 8, label: 'Pilar',          color: '#34d399', bg: '#0d2018' },
  { d: 'alto',  p: 'baixo', num: 7, label: 'Especialista',   color: '#58a6ff', bg: '#0d1f38' },
  { d: 'medio', p: 'alto',  num: 6, label: 'Alto Potencial', color: '#a78bfa', bg: '#18102e' },
  { d: 'medio', p: 'medio', num: 5, label: 'Núcleo',         color: '#f59e0b', bg: '#1c1500' },
  { d: 'medio', p: 'baixo', num: 4, label: 'Sólido',         color: '#fbbf24', bg: '#1a1200' },
  { d: 'baixo', p: 'alto',  num: 3, label: 'Diamante Bruto', color: '#fb923c', bg: '#1e1000' },
  { d: 'baixo', p: 'medio', num: 2, label: 'Dilema',         color: '#f87171', bg: '#250d0d' },
  { d: 'baixo', p: 'baixo', num: 1, label: 'Subperformance', color: '#ef4444', bg: '#2a0808' },
];

const NINE_BOX_MAP = Object.fromEntries(NINE_BOX_CONFIG.map(b => [`${b.d}-${b.p}`, b]));

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

function PyramidTier({ ids, players, clipPath, height = 120, leftPct, rightPct }) {
  const mainId = ids[0];
  const c = CONFIG[mainId];
  const allPlayers = players.filter(p => ids.includes(p.classificacao));
  const visibleWidth = rightPct - leftPct;

  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: c.bg, clipPath }} />
      <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ids.map(id => (
          <span key={id} style={{
            fontSize: 9, fontWeight: 700, color: CONFIG[id].text,
            background: `${CONFIG[id].dot}18`, border: `1px solid ${CONFIG[id].dot}40`,
            borderRadius: 3, padding: '1px 5px', whiteSpace: 'nowrap',
          }}>
            {id === 'A (potencial)' ? 'A*' : id === 'B (potencial)' ? 'B*' : id}
          </span>
        ))}
      </div>
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: `${leftPct}%`, width: `${visibleWidth}%`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
      }}>
        {allPlayers.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {allPlayers.map(p => (
              <span key={p.id} style={{
                background: `${c.dot}15`, border: `1px solid ${c.dot}40`,
                borderRadius: 20, padding: '2px 8px', fontSize: 11,
                color: '#e6edf3', fontWeight: 500, whiteSpace: 'nowrap',
              }}>
                {p.nome}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: 10, color: 'rgba(139,148,158,0.25)' }}>—</span>
        )}
      </div>
    </div>
  );
}

function NineBoxMatrix({ team }) {
  const rows = ['alto', 'medio', 'baixo'];
  const cols = ['baixo', 'medio', 'alto'];
  const rowLabel = { alto: 'Alto', medio: 'Médio', baixo: 'Baixo' };
  const colLabel = { baixo: 'Baixo', medio: 'Médio', alto: 'Alto' };

  return (
    <div style={{ background: '#161b22', border: '1px solid rgba(48,54,61,0.9)', borderRadius: 12, padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 11, fontWeight: 600, color: '#2CC295', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
          Matriz Nine Box
        </h2>
        <p style={{ fontSize: 11, color: '#8b949e', marginTop: 4 }}>
          Distribuição do time por desempenho e potencial
        </p>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {/* Y-axis label */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 14, flexShrink: 0 }}>
          <span style={{
            fontSize: 9, color: '#8b949e',
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap',
          }}>
            Desempenho ↑
          </span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Grid rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {rows.map(des => (
              <div key={des} style={{ display: 'flex', gap: 3, alignItems: 'stretch' }}>
                {/* Row label */}
                <div style={{ width: 32, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5 }}>
                  <span style={{ fontSize: 9, color: '#8b949e' }}>{rowLabel[des]}</span>
                </div>
                {/* Cells */}
                {cols.map(pot => {
                  const box = NINE_BOX_MAP[`${des}-${pot}`];
                  const people = team.filter(p => (p.desempenho || 'medio') === des && (p.potencial || 'medio') === pot);
                  return (
                    <div key={pot} style={{
                      flex: 1, minWidth: 0,
                      background: box.bg,
                      border: `1px solid ${box.color}35`,
                      borderRadius: 6, padding: '8px 10px', minHeight: 88,
                      display: 'flex', flexDirection: 'column',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                          background: `${box.color}20`, border: `1px solid ${box.color}45`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 9, fontWeight: 700, color: box.color,
                        }}>{box.num}</span>
                        <span style={{ fontSize: 9, fontWeight: 600, color: box.color, textAlign: 'right', lineHeight: 1.3, paddingLeft: 4 }}>
                          {box.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignContent: 'flex-start' }}>
                        {people.map(person => (
                          <span key={person.id} style={{
                            fontSize: 10, color: '#e6edf3', fontWeight: 500,
                            background: `${box.color}15`, border: `1px solid ${box.color}35`,
                            borderRadius: 20, padding: '1px 7px', whiteSpace: 'nowrap',
                          }}>
                            {person.nome}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* X-axis column labels */}
          <div style={{ display: 'flex', gap: 3, marginTop: 5 }}>
            <div style={{ width: 32, flexShrink: 0 }} />
            {cols.map(pot => (
              <div key={pot} style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ fontSize: 9, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {colLabel[pot]}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
            <div style={{ width: 32, flexShrink: 0 }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: 9, color: '#8b949e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Potencial →</span>
            </div>
          </div>

          {/* Legend */}
          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {NINE_BOX_CONFIG.slice().reverse().map(box => (
              <div key={box.num} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{
                  width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                  background: `${box.color}20`, border: `1px solid ${box.color}45`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 7, fontWeight: 700, color: box.color,
                }}>{box.num}</span>
                <span style={{ fontSize: 10, color: '#8b949e' }}>{box.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({ nome: '', funcao: '', classificacao: 'A', desempenho: 'medio', potencial: 'medio', comentario: '' });
  const [team, setTeam] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    if (!form.nome.trim()) return;
    if (editingId) {
      setTeam(prev => prev.map(p => p.id === editingId ? { ...form, id: editingId } : p));
      setEditingId(null);
    } else {
      setTeam(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setForm({ nome: '', funcao: '', classificacao: 'A', desempenho: 'medio', potencial: 'medio', comentario: '' });
  };

  const handleEdit = (p) => {
    setForm({ nome: p.nome, funcao: p.funcao, classificacao: p.classificacao, desempenho: p.desempenho || 'medio', potencial: p.potencial || 'medio', comentario: p.comentario });
    setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ nome: '', funcao: '', classificacao: 'A', desempenho: 'medio', potencial: 'medio', comentario: '' });
  };

  const handleRemove = (id) => {
    setTeam(prev => prev.filter(p => p.id !== id));
    if (editingId === id) handleCancelEdit();
  };

  const focusStyle = (name) => focusedInput === name
    ? { ...inputStyle, borderColor: '#2CC295' }
    : inputStyle;

  const levelColors = { baixo: '#f87171', medio: '#f59e0b', alto: '#2CC295' };
  const levelLabels = { baixo: 'Baixo', medio: 'Médio', alto: 'Alto' };

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
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.02em', marginBottom: 12 }}>
          Análise de Equipe
        </h1>
        <p style={{ fontSize: 13, color: '#8b949e', marginBottom: 4, lineHeight: 1.6 }}>
          Essa ferramenta ajuda a analisar a sua estrutura atual de pessoas, separando todos os colaboradores em uma pirâmide com 3 níveis.
        </p>
        <p style={{ fontSize: 13, color: '#8b949e', marginBottom: 20, lineHeight: 1.6 }}>
          Classifique cada uma das pessoas do seu time dentro da Matriz ABC e da Matriz Nine Box.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'A', color: '#2CC295', title: 'A — Rockstar', desc: 'É uma pessoa que se sair da empresa fará muita falta, pois tem uma entrega acima da média e é estratégica.' },
            { id: 'B', color: '#58a6ff', title: 'B — Entrega consistente', desc: 'É uma pessoa que entrega de maneira consistente as suas tarefas, mas que não irá fazer grandes entregas ou ser extremamente estratégica para a empresa.' },
            { id: 'C', color: '#f87171', title: 'C — Atrapalha o time e a entrega', desc: 'É uma pessoa que não faz suas entregas de maneira consistente e ainda atrapalha o time e a entrega final dos projetos / tarefas.' },
          ].map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{
                width: 22, height: 22, borderRadius: 4, flexShrink: 0, marginTop: 1,
                background: `${item.color}18`, border: `1.5px solid ${item.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: item.color,
              }}>{item.id}</span>
              <p style={{ fontSize: 12, color: '#8b949e', lineHeight: 1.6, margin: 0 }}>
                <span style={{ color: item.color, fontWeight: 600 }}>{item.title}:</span>{' '}{item.desc}
              </p>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: 'rgba(48,54,61,0.9)' }} />
      </div>

      <div style={{
        maxWidth: 1140, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24, alignItems: 'start',
      }}>
        {/* Form */}
        <div style={{
          background: '#161b22', border: `1px solid ${editingId ? 'rgba(88,166,255,0.4)' : 'rgba(48,54,61,0.9)'}`,
          borderRadius: 12, padding: 24, position: 'sticky', top: 24,
          transition: 'border-color 0.2s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{
              fontSize: 11, fontWeight: 600,
              color: editingId ? '#58a6ff' : '#2CC295',
              textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0,
            }}>
              {editingId ? '✎ Editando colaborador' : 'Adicionar colaborador'}
            </h2>
            {editingId && (
              <button onClick={handleCancelEdit} style={{
                background: 'none', border: 'none', color: '#8b949e',
                cursor: 'pointer', fontSize: 11, padding: 0,
              }}>
                Cancelar
              </button>
            )}
          </div>

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

          {/* Desempenho + Potencial */}
          <div style={{ marginBottom: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { key: 'desempenho', label: 'Desempenho' },
              { key: 'potencial', label: 'Potencial' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label style={{ fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                  {label}
                </label>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['baixo', 'medio', 'alto'].map(val => {
                    const selected = form[key] === val;
                    const color = levelColors[val];
                    return (
                      <button
                        key={val}
                        onClick={() => setForm({ ...form, [key]: val })}
                        style={{
                          flex: 1, padding: '6px 0', fontSize: 10, fontWeight: 600,
                          borderRadius: 6, cursor: 'pointer', transition: 'all 0.12s',
                          background: selected ? `${color}20` : 'transparent',
                          border: `1px solid ${selected ? color : 'rgba(48,54,61,0.9)'}`,
                          color: selected ? color : '#8b949e',
                        }}
                      >
                        {levelLabels[val]}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Classificação ABC */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>
              Classificação ABC
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
                      {cls.id === 'A (potencial)' ? 'A*' : cls.id === 'B (potencial)' ? 'B*' : cls.id}
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
              Observações sobre a pessoa
            </label>
            <textarea
              value={form.comentario}
              onChange={e => setForm({ ...form, comentario: e.target.value })}
              onFocus={() => setFocusedInput('comentario')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Ex: atenta a detalhes, cumpre prazos, alta capacidade de aprendizado, entrega dentro do esperado, não esteve disponível algumas vezes que precisamos, atrasa as entregas, qualidade de execução abaixo do esperado, etc."
              rows={3}
              style={{ ...focusStyle('comentario'), resize: 'vertical', minHeight: 72, lineHeight: 1.5 }}
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={!form.nome.trim()}
            style={{
              width: '100%',
              background: !form.nome.trim() ? 'rgba(44,194,149,0.3)' : editingId ? '#58a6ff' : '#2CC295',
              color: !form.nome.trim() ? 'rgba(44,194,149,0.5)' : '#0d1117',
              border: 'none', borderRadius: 8, padding: '11px',
              fontSize: 13, fontWeight: 700, cursor: form.nome.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            {editingId ? '✓ Salvar alterações' : '+ Adicionar ao time'}
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
                Adicione colaboradores para ver a análise, a pirâmide ABC e a Matriz Nine Box.
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
                    {['Nome / Função', 'Classificação ABC', 'Nine Box', 'Comentário', ''].map((h, i) => (
                      <th key={i} style={{
                        padding: '10px 16px', textAlign: 'left',
                        fontSize: 10, color: '#8b949e', fontWeight: 500,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        borderBottom: '1px solid rgba(48,54,61,0.9)',
                        width: i === 4 ? 40 : 'auto',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {team.map((p, i) => {
                    const box = NINE_BOX_MAP[`${p.desempenho || 'medio'}-${p.potencial || 'medio'}`];
                    return (
                      <tr
                        key={p.id}
                        style={{
                          background: i % 2 === 0 ? '#161b22' : '#1c2128',
                          borderBottom: i < team.length - 1 ? '1px solid rgba(48,54,61,0.5)' : 'none',
                        }}
                      >
                        <td style={{ padding: '12px 16px', minWidth: 130 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>{p.nome}</div>
                          {p.funcao && <div style={{ fontSize: 11, color: '#8b949e', marginTop: 2 }}>{p.funcao}</div>}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <Badge id={p.classificacao} />
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            background: `${box.color}18`, color: box.color,
                            border: `1px solid ${box.color}40`,
                            borderRadius: 6, padding: '3px 9px', fontSize: 11, fontWeight: 700,
                            whiteSpace: 'nowrap',
                          }}>
                            <span style={{ fontSize: 9 }}>{box.num}</span> {box.label}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#8b949e', maxWidth: 240, lineHeight: 1.5 }}>
                          {p.comentario || <span style={{ color: 'rgba(139,148,158,0.4)' }}>—</span>}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <button
                            onClick={() => handleEdit(p)}
                            title="Editar"
                            style={{
                              background: editingId === p.id ? 'rgba(88,166,255,0.15)' : 'none',
                              border: `1px solid ${editingId === p.id ? 'rgba(88,166,255,0.4)' : 'transparent'}`,
                              borderRadius: 6, color: editingId === p.id ? '#58a6ff' : '#8b949e',
                              cursor: 'pointer', fontSize: 13, padding: '2px 7px',
                              lineHeight: 1, transition: 'all 0.1s', marginRight: 4,
                            }}
                            onMouseEnter={e => { if (editingId !== p.id) { e.currentTarget.style.color = '#58a6ff'; e.currentTarget.style.borderColor = 'rgba(88,166,255,0.3)'; }}}
                            onMouseLeave={e => { if (editingId !== p.id) { e.currentTarget.style.color = '#8b949e'; e.currentTarget.style.borderColor = 'transparent'; }}}
                          >
                            ✎
                          </button>
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
                    );
                  })}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%' }}>
                <div style={{
                  width: '100%', height: 22,
                  background: CONFIG['A'].bg,
                  clipPath: 'polygon(50% 0%, 52% 100%, 48% 100%)',
                  flexShrink: 0,
                }} />
                <PyramidTier
                  ids={['A', 'A (potencial)']}
                  players={team}
                  clipPath="polygon(48% 0%, 52% 0%, 68% 100%, 32% 100%)"
                  height={110}
                  leftPct={40} rightPct={60}
                />
                <PyramidTier
                  ids={['B', 'B (potencial)']}
                  players={team}
                  clipPath="polygon(32% 0%, 68% 0%, 84% 100%, 16% 100%)"
                  height={110}
                  leftPct={24} rightPct={76}
                />
                <PyramidTier
                  ids={['C']}
                  players={team}
                  clipPath="polygon(16% 0%, 84% 0%, 100% 100%, 0% 100%)"
                  height={110}
                  leftPct={8} rightPct={92}
                />
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

          {/* Nine Box Matrix */}
          {team.length > 0 && <NineBoxMatrix team={team} />}
        </div>
      </div>
    </div>
  );
}
