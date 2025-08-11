import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoComplete, Input, Spin, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetSearchResultsQuery } from '@/store/apis/coreApi';
import { debounce } from '@/shared/utils';

interface Application {
  id: number;
  status: string;
  user: {
    first_name: string;
    last_name: string;
    fullname: string;
    email: string;
  };
  google_sheet_url: string;
}

interface User {
  fullname: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
}

interface ComplianceNote {
  found: boolean;
  result: {
    clientEmail: string;
    firstName: string;
    lastName: string;
    serviceName: string;
    serviceId: string;
  };
}

interface PurchaseGravityForm {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    fullname: string;
    email: string;
  };
  google_sheet_url: string;
}

interface RefinanceGravityForm {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    fullname: string;
    email: string;
  };
  google_sheet_url: string;
}

const SearchBar: React.FC = () => {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 500),
    [],
  );

  const { data, isLoading, isFetching } = useGetSearchResultsQuery(
    { query: debouncedQuery },
    {
      skip: !debouncedQuery || debouncedQuery.length < 3,
      refetchOnMountOrArgChange: true,
    },
  );

  const applications = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 3) return null;
    return data?.data || null;
  }, [data, debouncedQuery]);

  const navigate = useNavigate();

  const options = useMemo(() => {
    if (isFetching) return [];

    if (!applications || !debouncedQuery) return [];

    const formatCategory = (
      type:
        | 'purchase'
        | 'refinance'
        | 'user'
        | 'compliance_notes'
        | 'purchase_gravity_form'
        | 'refinance_gravity_form',
      items: Application[] | User[] | ComplianceNote[],
    ) => {
      if (type === 'purchase' || type === 'refinance') {
        const apps = items as Application[];
        return {
          label: (
            <Typography.Title
              level={5}
              style={{ fontWeight: 'bold', margin: 0, color: '#555555' }}
            >
              {type.toUpperCase()}
            </Typography.Title>
          ),
          options: apps.map((app, index) => ({
            key: `${app.id}${index}`,
            value: `${app.user.first_name} ${app.user.last_name} (${app.user.email}) : ${type.toUpperCase()} Application ${app.id}`,
            label: (
              <div key={`${app.id}${index}`}>
                <div>
                  <strong>{app.user.fullname}</strong> —{' '}
                  {app?.status
                    ?.split('_')
                    .map((s) => s.toUpperCase())
                    .join(' ')}
                </div>
                <small>{app.user.email}</small>
              </div>
            ),
            app,
          })),
        };
      }

      if (type === 'user') {
        const users = items as User[];
        return {
          label: (
            <Typography.Title
              level={5}
              style={{ fontWeight: 'bold', margin: 0, color: '#555555' }}
            >
              {type.toUpperCase()}
            </Typography.Title>
          ),
          options: users.map((user: User, index: number) => ({
            key: `${user.id}${index}`,
            value: `${user?.first_name} ${user?.last_name} (${user?.email})`,
            label: (
              <div>
                <div>
                  <strong>
                    {user?.first_name} {user?.last_name}
                  </strong>
                </div>
                <small>{user?.email}</small>
              </div>
            ),
          })),
        };
      }
      if (type === 'compliance_notes') {
        const notes = (items as ComplianceNote[]).filter((note) => note.found);
        console.log('notes', notes);
        return {
          label: (
            <Typography.Title
              level={5}
              style={{ fontWeight: 'bold', margin: 0, color: '#555555' }}
            >
              COMPLIANCE NOTES
            </Typography.Title>
          ),
          options: notes.map((note: ComplianceNote, index: number) => {
            if (note.found && note.result) {
              const r = note.result;
              return {
                key: `${r.serviceId}${r.clientEmail}`,
                value: `${r.serviceName.toUpperCase()} (${r.clientEmail})`,
                label: (
                  <div>
                    <div>
                      <strong>
                        {r.firstName} {r.lastName} ({r.clientEmail})
                      </strong>{' '}
                      : {r.serviceName?.toUpperCase()}
                    </div>
                    <small>{r.clientEmail}</small>
                  </div>
                ),
                result: r,
              };
            } else {
              return {
                key: `Note ${index + 1}`,
                value: `Note ${index + 1} (No match)`,
                label: (
                  <div>
                    <div>
                      <strong>Compliance Note Not Found</strong>
                    </div>
                    <small>Missing or unmatched data</small>
                  </div>
                ),
              };
            }
          }),
        };
      }

      if (type === 'purchase_gravity_form') {
        const forms = items as PurchaseGravityForm[];
        console.log('purchase forms', forms?.length);
        return {
          label: (
            <Typography.Title
              level={5}
              style={{ fontWeight: 'bold', margin: 0, color: '#555555' }}
            >
              PURCHASE GRAVITY FORM
            </Typography.Title>
          ),
          options: forms.map((form: any, index) => ({
            key: `${form.id}${index}`,
            value: `${form['186']} (${form['188']}) : ${form.id}`,
            label: (
              <div>
                <div>
                  <strong>
                    {form['186']} {form['188']}
                  </strong>
                </div>
                <small>{form['192']}</small>
              </div>
            ),
            id: form.id,
          })),
        };
      }

      if (type === 'refinance_gravity_form') {
        const forms = items as RefinanceGravityForm[];
        console.log('refinance forms', forms?.length);
        return {
          label: (
            <Typography.Title
              level={5}
              style={{ fontWeight: 'bold', margin: 0, color: '#555555' }}
            >
              REFINANCE GRAVITY FORM
            </Typography.Title>
          ),
          options: forms.map((form: any, index) => {
            return {
              key: `${form.id}${index}`,
              value: `${form['16.3']} ${form['16.6']}`,
              label: (
                <div>
                  <div>
                    <strong>
                      {form['16.3']} ${form['16.6']}
                    </strong>
                  </div>
                  <small>{form['17']}</small>
                </div>
              ),
              id: form.id,
            };
          }),
        };
      }
      return {
        label: <strong>UNKNOWN</strong>,
        options: [],
      };
    };

    const result: any[] = [];

    if (applications.purchase?.length) {
      result.push(formatCategory('purchase', applications.purchase));
    }

    if (applications.refinance?.length) {
      result.push(formatCategory('refinance', applications.refinance));
    }

    if (applications.users?.length) {
      result.push(formatCategory('user', applications.users));
    }

    if (applications.complianceNotes?.length) {
      result.push(
        formatCategory('compliance_notes', applications.complianceNotes),
      );
    }

    if (applications.purchaseGravityForm?.length) {
      result.push(
        formatCategory(
          'purchase_gravity_form',
          applications.purchaseGravityForm,
        ),
      );
    }

    if (applications.refinanceGravityForm?.length) {
      result.push(
        formatCategory(
          'refinance_gravity_form',
          applications.refinanceGravityForm,
        ),
      );
    }

    return result;
  }, [applications, debouncedQuery]);

  const onSelect = (value: string, option: any) => {
    const { app, result, id } = option;

    if (app) {
      const type = value.includes('PURCHASE') ? 'purchase' : 'refinance';
      navigate(`/client/details/${type}/${app.id}/assessment-detail`, {
        replace: true,
      });
    } else if (result) {
      navigate(
        `/client/overview/${result.serviceName}/${result.serviceId}/compliance-note`,
        {
          replace: true,
        },
      );
    } else if (id) {
      navigate(`/client/overview/website/${id}/compliance-note`);
    } else {
      console.warn('Unknown option type selected');
    }
    setDebouncedQuery('');
  };

  const autoCompleteRef = useRef<any>(null);

  console.log('options', options);

  return (
    <AutoComplete
      ref={autoCompleteRef}
      style={{ width: '100%', margin: '1rem 0rem' }}
      options={options}
      onSelect={onSelect}
      onChange={(value) => {
        const trimmed = value.trim();
        if (trimmed.length >= 3) {
          debouncedSetQuery(trimmed);
        } else {
          setDebouncedQuery(''); // ensure query is skipped
        }
      }}
      notFoundContent={
        isLoading || isFetching ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem',
              justifyContent: 'center',
            }}
          >
            <Spin size="small" />
            <span>Searching...</span>
          </div>
        ) : (
          <div style={{ padding: '0.5rem', textAlign: 'center' }}>
            No results found
          </div>
        )
      }
      dropdownRender={(menu) => (
        <div>
          {menu}
          {debouncedQuery?.length >= 3 && (
            <div
              role="presentation"
              style={{
                borderTop: '1px solid #f0f0f0',
                padding: '8px 12px',
                background: '#fafafa',
                cursor: 'pointer',
                fontWeight: 500,
                color: '#1677ff',
                textAlign: 'center',
                pointerEvents: 'auto',
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                autoCompleteRef.current?.blur();
                setDebouncedQuery('');
                navigate(
                  `/contacts/search/results/?searchQuery=${debouncedQuery}`,
                );
              }}
            >
              🔍 Get all results for the query
            </div>
          )}
        </div>
      )}
    >
      <Input
        size="large"
        allowClear={true}
        placeholder="Search by name, email, or ID..."
        prefix={<SearchOutlined />}
      />
    </AutoComplete>
  );
};

export default SearchBar;
